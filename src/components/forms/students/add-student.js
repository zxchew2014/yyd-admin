import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import * as students from "../../../actions/students";

class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Branch: "",
      Primary: ""
    };
  }

  onSubmit = event => {
    const { addStudent } = this.props;
    event.preventDefault();
    addStudent(this.state)
      .then(
        this.setState({
          Name: "",
          Branch: "",
          Primary: ""
        })
      )
      .then(
        delete this.state.Id,
        delete this.state.Batch,
        delete this.state.Class
      );
  };

  handleNameInputChange = event => {
    this.setState({ Name: event.target.value });
  };

  handlePrimaryInputChange = event => {
    this.setState({ Primary: event.target.value });
  };

  handleBranchInputChange = event => {
    event.target.value === "Punggol"
      ? this.setState({ Branch: event.target.value, Batch: "" })
      : [
          this.setState({ Branch: event.target.value }),
          delete this.state.Batch
        ];
  };

  handleBatchInputChange = event => {
    this.setState({ Batch: event.target.value });
  };

  handleClassInputChange = event => {
    this.setState({ Class: event.target.value });
  };

  renderBatchDropDownList() {
    const { Batch } = this.state;
    const FORM_FIELD_BATCH = () => (
      <Form.Field>
        <label htmlFor="batch">Batch</label>
        <select
          ref="batch"
          name="batch"
          id="batch"
          onChange={this.handleBatchInputChange}
          value={Batch || ""}
          required
        >
          <option key={Batch || ""} defaultValue={Batch || ""} />
          <option key="1" value="1">
            Batch 1
          </option>
          <option key="2" value="2">
            Batch 2
          </option>
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BATCH();
  }

  renderPrimaryDropDownList() {
    const primaryLevel = ["2", "3", "4", "5", "6"];
    const { Primary } = this.state;

    const PRIMARY_OPTIONS = _.map(primaryLevel, (value, key) => (
      <option key={key} value={value}>
        Primary {value}
      </option>
    ));

    const FORM_FIELD_PRIMARY = () => (
      <Form.Field>
        <label htmlFor="primary">Primary</label>
        <select
          ref="primary"
          name="primary"
          id="primary"
          onChange={this.handlePrimaryInputChange}
          value={Primary || ""}
          required
        >
          <option key={Primary || ""} defaultValue={Primary || ""} />
          {PRIMARY_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_PRIMARY();
  }

  renderClassDropDownList() {
    const { Class } = this.state;
    const FORM_FIELD_CLASS = () => (
      <Form.Field>
        <label htmlFor="classNo">Class (Optional)</label>
        <select
          ref="classNo"
          name="classNo"
          id="classNo"
          onChange={this.handleClassInputChange}
          value={Class || ""}
        >
          <option key={Class || ""} defaultValue={Class || ""} />
          <option key="1" value="1">
            Class 1
          </option>
          <option key="2" value="2">
            Class 2
          </option>
        </select>
      </Form.Field>
    );

    return FORM_FIELD_CLASS();
  }

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
          name="branch"
          id="branch"
          onChange={this.handleBranchInputChange}
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
    const { Name, Branch } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          id="form-input-control-name"
          control={Input}
          value={Name || ""}
          label="Full Name"
          placeholder="Full Name"
          name="name"
          onChange={this.handleNameInputChange}
          required
        />
        {this.renderBranchDropDownList()}
        {Branch === "Punggol" ? this.renderBatchDropDownList() : null}
        {this.renderPrimaryDropDownList()}
        {this.renderClassDropDownList()}
        <Button type="submit" primary>
          Add Student
        </Button>
      </Form>
    );
  };

  render() {
    return [
      <div className="add-student-form">
        {this.renderAddForm()}
        {JSON.stringify(this.state)}
      </div>
    ];
  }
}
const mapStateToProps = ({ branches }) => ({ branches });

export default connect(
  mapStateToProps,
  students
)(AddStudentForm);
