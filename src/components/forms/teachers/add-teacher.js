import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import { Form, Input, Button } from "semantic-ui-react";
import * as teachers from "../../../actions/teachers";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Branch: "",
      Mobile: ""
    };
  }

  onSubmit = event => {
    const { addTeacher } = this.props;
    event.preventDefault();
    addTeacher(this.state).then(
      this.setState({
        Name: "",
        Branch: "",
        Mobile: ""
      })
    );
  };

  updateTeacher = event => {
    const { updateTeacher } = this.props;
    event.preventDefault();
    updateTeacher(this.state).then(
      this.setState({
        Name: "",
        Branch: "",
        Mobile: ""
      })
    );
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { Branch } = this.state;

    const BRANCH_OPTIONS = _.map(branches, (value, key) => (
      <option key={key} defaultValue={value}>
        {value}
      </option>
    ));

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
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BRANCH();
  }

  renderAddForm = () => {
    const { Name, Mobile } = this.state;
    const { teacher } = this.props;
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
        />

        {this.renderBranchDropDownList()}

        {JSON.stringify(teacher) === JSON.stringify({}) ? (
          <Button type="submit" primary>
            Add Teacher
          </Button>
        ) : (
          <Button type="submit" primary onClick={() => this.updateTeacher()}>
            Update Teacher
          </Button>
        )}
      </Form>
    );
  };

  render() {
    return [<div className="add-teacher-form">{this.renderAddForm()}</div>];
  }
}

AddTeacher.propTypes = {
  teacher: PropTypes.objectOf(PropTypes.object).isRequired,
  updateTeacher: PropTypes.func.isRequired,
  addTeacher: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(
  mapStateToProps,
  teachers
)(AddTeacher);
