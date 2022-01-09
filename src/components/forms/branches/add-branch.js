import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import { Button, Form, Input } from "semantic-ui-react";

class AddBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Branch_Name: "",
      teacher_payout: "0",
      parent_volunteer_payout: "0",
      Active: true
    };
  }

  onSubmit = event => {
    const {
      addBranch,
      updateBranch,
      updateBranchDetail,
      branches
    } = this.props;
    let { Branch_Name, teacher_payout, parent_volunteer_payout } = this.state;

    this.state.teacher_payout = parseFloat(teacher_payout).toFixed(2);
    this.state.parent_volunteer_payout = parseFloat(
      parent_volunteer_payout
    ).toFixed(2);

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

  renderAddForm = () => {
    const { Branch_Name, teacher_payout, parent_volunteer_payout } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
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
        />

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

        <Button type="submit" primary>
          Add Branch
        </Button>
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

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, branches)(AddBranch);
