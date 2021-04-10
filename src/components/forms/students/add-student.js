import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import * as students from "../../../actions/students";
import { ALL_PRIMARY_LEVEL, ALL_BATCH } from "../../../utils/common";
import PropTypes from "prop-types";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";

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
    const { Batch } = this.state;
    if (Batch === "") {
      delete this.state.Batch;
    }
    addStudent(this.state);
    this.props.onNext();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderBatchDropDownList() {
    const { Batch } = this.state;

    const BATCH_OPTIONS = _.map(ALL_BATCH, value => (
      <option key={value} value={value}>
        BATCH {value}
      </option>
    ));

    const FORM_FIELD_BATCH = () => (
      <Form.Field>
        <label htmlFor="batch">Batch</label>
        <select
          ref="batch"
          name="Batch"
          id="batch"
          onChange={this.handleInputChange}
          value={Batch || ""}
        >
          <option key={""} value={""} />
          {BATCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BATCH();
  }

  renderPrimaryDropDownList() {
    const primaryLevel = ALL_PRIMARY_LEVEL;
    const { Primary } = this.state;

    const PRIMARY_OPTIONS = _.map(primaryLevel, (value, key) => (
      <option key={key} value={value}>
        Primary {value}
      </option>
    ));

    const FORM_FIELD_PRIMARY = () => (
      <Form.Field required>
        <label htmlFor="primary">Primary</label>
        <select
          ref="primary"
          name="Primary"
          id="primary"
          onChange={this.handleInputChange}
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

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { Branch } = this.state;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

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
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BRANCH();
  }

  renderAddForm = () => {
    const { Name } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          id="form-input-control-name"
          control={Input}
          value={Name || ""}
          label="Full Name"
          placeholder="Full Name"
          name="Name"
          onChange={this.handleInputChange}
          required
        />
        {this.renderBranchDropDownList()}
        {this.renderBatchDropDownList()}
        {this.renderPrimaryDropDownList()}
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
      </div>
    ];
  }
}

AddStudentForm.propTypes = {
  onNext: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({ branches });

export default connect(mapStateToProps, students)(AddStudentForm);
