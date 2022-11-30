import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";
import * as teachers from "../../../actions/teachers";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";
import { EDUCATION_LEVEL } from "../../../utils/common";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Branch: "",
      Mobile: "",
      level: "Primary"
    };
  }

  onSubmit = event => {
    const { addTeacher } = this.props;
    event.preventDefault();
    addTeacher(this.state);
    this.props.navToTeacherPage();
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "level") {
      const { fetchBranchList } = this.props;
      fetchBranchList(value);
    }

    this.setState({ [name]: value });
  };

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { Branch, level } = this.state;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches, level);

    const FORM_FIELD_BRANCH = () => (
      <Form.Field required>
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

  renderLevelRadioboxList() {
    const { level } = this.state;
    const FORM_FIELD_LEVEL = () => (
      <Form.Field required>
        <label htmlFor="Level">Teaching Level</label>
        <Form.Group>{LEVEL_RADIOBOX_FIELDS}</Form.Group>
      </Form.Field>
    );

    const LEVEL_RADIOBOX_FIELDS = EDUCATION_LEVEL.map(l => (
      <Form.Field
        key={l}
        label={l}
        control="input"
        type="radio"
        name="level"
        value={l}
        checked={level === l}
        onChange={this.handleInputChange}
      />
    ));

    return FORM_FIELD_LEVEL();
  }

  renderAddForm = () => {
    const { Name, Mobile } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Button
            secondary
            fluid
            content="Back"
            onClick={() => this.props.navToTeacherPage()}
        />
        <br />
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
        {this.renderLevelRadioboxList()}
        {this.renderBranchDropDownList()}
        <Button type="submit" fluid primary content="Add Teacher" />
      </Form>
    );
  };

  render() {
    return <div className="add-teacher-form">{this.renderAddForm()}</div>;
  }
}

AddTeacher.propTypes = {
  navToTeacherPage: PropTypes.func.isRequired,
  teacher: PropTypes.objectOf(PropTypes.object).isRequired,
  addTeacher: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, teachers)(AddTeacher);
