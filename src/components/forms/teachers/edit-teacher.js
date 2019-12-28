import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as teachers from "../../../actions/teachers";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";

class EditTeacher extends React.Component {
  constructor(props) {
    super(props);
    const { teacher } = this.props;
    this.state = {
      Id: teacher.Id,
      Name: teacher.Name,
      Branch: teacher.Branch,
      Mobile: teacher.Mobile
    };
  }

  onSubmit = event => {
    const { updateTeacher, addTeacher, removeTeacher, teacher } = this.props;

    event.preventDefault();
    if (teacher.Branch === this.state.Branch) {
      updateTeacher(this.state);
    } else {
      removeTeacher(teacher);
      addTeacher(this.state);
    }
    this.props.navToTeacherPage();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { Branch } = this.state;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

    const FORM_FIELD_BRANCH = () => (
      <Form.Field>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="Branch"
          id="branch"
          onChange={this.handleInputChange}
          value={Branch || ""}
          required
        >
          <option key={Branch || ""} defaultValue={Branch || ""} />
          {BRANCH_OPTIONS}
          <option key="Relief" value="Relief">
            Relief Teacher - that is not belong to any branch
          </option>
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BRANCH();
  }

  renderEditForm = () => {
    const { Name, Mobile } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          id="form-input-control-first-name"
          control={Input}
          value={Name || ""}
          label="Full Name (Same as NRIC)"
          placeholder="Full Name"
          name="Name"
          onChange={this.handleInputChange}
          required
        />

        <Form.Field
          id="form-input-control-mobile"
          control={Input}
          value={Mobile || ""}
          type="number"
          label="Mobile Number"
          placeholder="Mobile Number"
          name="Mobile"
          onChange={this.handleInputChange}
          required
        />

        {this.renderBranchDropDownList()}
        <Button type="submit" primary>
          Update Teacher
        </Button>
      </Form>
    );
  };

  render() {
    return [<div className="edit-teacher-form">{this.renderEditForm()}</div>];
  }
}

EditTeacher.propTypes = {
  navToTeacherPage: PropTypes.func.isRequired,
  teacher: PropTypes.objectOf(PropTypes.object),
  updateTeacher: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches, teacher }) => ({
  branches,
  teacher
});

export default connect(mapStateToProps, teachers)(EditTeacher);
