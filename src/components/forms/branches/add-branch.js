import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import { Button, Form, Input } from "semantic-ui-react";
import { EDUCATION_LEVEL } from "../../../utils/common";

class AddBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Branch_Name: "",
      branch_code: "",
      teacher_payout: "0",
      parent_volunteer_payout: "0",
      Active: true,
      primary: false,
      secondary: false
    };
  }

  onSubmit = event => {
    const {
      addBranch,
      updateBranch,
      updateBranchDetail,
      branches
    } = this.props;
    const { isPayoutDisplay } = this.props.feature_flag;

    let {
      Branch_Name,
      branch_code,
      teacher_payout,
      parent_volunteer_payout
    } = this.state;

    if (isPayoutDisplay) {
      this.state.teacher_payout = parseFloat(teacher_payout).toFixed(2);
      this.state.parent_volunteer_payout = parseFloat(
        parent_volunteer_payout
      ).toFixed(2);
    } else {
      delete this.state.teacher_payout;
      delete this.state.parent_volunteer_payout;
    }

    this.state.branch_code = branch_code.toUpperCase();

    let existingBranch = null;
    let checkExisted = false;

    event.preventDefault();

    Object.keys(branches).forEach(key => {
      const currentBranch = branches[key];
      const currentBranchNameUpper = currentBranch.Branch_Name.toUpperCase();

      if (currentBranchNameUpper === Branch_Name.toUpperCase()) {
        existingBranch = currentBranch;
        const active = currentBranch.Active;
        if (!active) {
          checkExisted = true;
        }
      }
    });

    if (checkExisted) {
      existingBranch.Active = true;
      updateBranch(existingBranch);
    } else {
      if (existingBranch === null) {
        addBranch(this.state);
      } else {
        existingBranch.teacher_payout = this.state.teacher_payout;
        existingBranch.parent_volunteer_payout = this.state.parent_volunteer_payout;
        updateBranchDetail(existingBranch);
      }
    }

    this.props.onNext();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      if (value === "Primary") this.setState({ primary: true });
      if (value === "Secondary") this.setState({ secondary: true });
    } else {
      if (value === "Primary") this.setState({ primary: false });
      if (value === "Secondary") this.setState({ secondary: false });
    }
  };

  getLevelChecked = level => {
    const { secondary, primary } = this.state;
    if (level === "Primary") return primary;
    if (level === "Secondary") return secondary;
  };

  renderAddForm = () => {
    const {
      Branch_Name,
      branch_code,
      teacher_payout,
      parent_volunteer_payout,
      primary,
      secondary
    } = this.state;
    const { IsPayoutDisplay } = this.props.feature_flag;
    const FORM_FIELD_LEVEL = () => (
      <Form.Field required>
        <label htmlFor="Level">Level</label>
        <Form.Group required>{LEVEL_CHECKBOX_FIELDS}</Form.Group>
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
        <Button secondary fluid onClick={() => this.props.onNext()}>
          Back
        </Button>
        <br />

        <Form.Field
          id="form-input-control-branch-name"
          control={Input}
          value={Branch_Name || ""}
          label="Branch Name"
          placeholder="Branch Name"
          name="Branch_Name"
          onChange={this.handleInputChange}
          required
        />

        <Form.Field
          id="form-input-control-branch-code"
          control={Input}
          value={branch_code || ""}
          label="Branch Code (Mainly show in attendance summary)"
          placeholder="Branch Code"
          name="branch_code"
          onChange={this.handleInputChange}
          required
        />
        {FORM_FIELD_LEVEL()}
        {IsPayoutDisplay
          ? [
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
              />
            ]
          : null}

        {primary || secondary ? (
          <Button type="submit" fluid primary>
            Add Branch
          </Button>
        ) : null}
      </Form>
    );
  };

  render() {
    return <div className="add-branch-form">{this.renderAddForm()}</div>;
  }
}

AddBranch.propTypes = {
  onNext: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches, feature_flag }) => ({
  branches,
  feature_flag
});

export default connect(mapStateToProps, branches)(AddBranch);
