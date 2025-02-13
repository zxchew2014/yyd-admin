import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import { EDUCATION_LEVEL } from "../../../utils/common";

class EditBranch extends React.Component {
  constructor(props) {
    super(props);
    const { branch } = this.props;
    this.state = {
      ...branch
    };
  }

  onSubmit = event => {
    const { updateBranchDetail, branch } = this.props;
    const {branch_code} = this.state

    this.state.branch_code = branch_code.toUpperCase();

    event.preventDefault();
    if (branch.Branch_Name === this.state.Branch_Name) {
      updateBranchDetail(this.state);
    }
    this.props.onBack();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      if (value === "Primary") this.setState({ primary: true });
      else this.setState({ secondary: true });
    } else {
      if (value === "Primary") this.setState({ primary: false });
      else this.setState({ secondary: false });
    }
  };

  getLevelChecked = level => {
    const { secondary, primary } = this.state;
    if (level === "Primary") return primary;
    if (level === "Secondary") return secondary;
  };

  renderEditForm = () => {
    const { Branch_Name, branch_code, teacher_payout, parent_volunteer_payout, primary, secondary } = this.state;
    const { isPayoutDisplay } = this.props.feature_flag;

    const FORM_FIELD_LEVEL = () => (
      <Form.Field required>
        <label htmlFor="Level">Level</label>
        <Form.Group>{LEVEL_CHECKBOX_FIELDS}</Form.Group>
      </Form.Field>
    );

    const LEVEL_CHECKBOX_FIELDS = EDUCATION_LEVEL.map(level => (
      <Form.Field
        key={level}
        label={level}
        control="input"
        type="checkbox"
        name={level}
        value={level}
        checked={this.getLevelChecked(level)}
        onChange={this.handleCheckboxChange}
      />
    ));

    return (
      <Form onSubmit={this.onSubmit}>
        <Button secondary fluid onClick={() => this.props.onBack()}>
          Back
        </Button>
        <br />

        <Form.Field
          id="form-input-control-branch-name"
          control={Input}
          value={Branch_Name || ""}
          label="Branch Name (Read-Only)"
          placeholder="Branch Name"
          name="Branch_Name"
          onChange={this.handleInputChange}
          readOnly={true}
        />
          <Form.Field
              id="form-input-control-branch-code"
              control={Input}
              value={branch_code || ""}
              label="Branch Code"
              placeholder="Branch Code"
              name="branch_code"
              onChange={this.handleInputChange}
          />
        {FORM_FIELD_LEVEL()}

        {
          isPayoutDisplay ? [
              <Form.Field
              id="form-input-control-branch-payout"
              control={Input}
              type="number"
              min="0"
              step="0.05"
              value={teacher_payout}
              label="Teacher Payout"
              placeholder="Teacher Payout"
              name="teacher_payout"
              onChange={this.handleInputChange}
          />,

            <Form.Field
                id="form-input-control-parent-volunteer-payout"
                control={Input}
                type="number"
                min="0"
                step="0.05"
                value={parent_volunteer_payout}
                label="Parent Volunteer Payout"
                placeholder="Parent Volunteer Payout"
                name="parent_volunteer_payout"
                onChange={this.handleInputChange}
            />] : null
        }
        {
          (primary || secondary) ?  <Button type="submit" fluid primary>
            Update Branch
          </Button> : null
        }
      </Form>
    );
  };

  render() {
    return [<div className="edit-branch-form">{this.renderEditForm()}</div>];
  }
}

EditBranch.propTypes = {
  onBack: PropTypes.func.isRequired
};

const mapStateToProps = ({ branch, feature_flag }) => ({
  branch,
  feature_flag
});

export default connect(mapStateToProps, branches)(EditBranch);
