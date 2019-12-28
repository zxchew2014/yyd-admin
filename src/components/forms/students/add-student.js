import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import * as students from "../../../actions/students";
import {
  ALL_PRIMARY_LEVEL,
  BRANCH_PUNGGOL,
  BATCH_1,
  BATCH_2
} from "../../../utils/common";
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
    this.props.navToStudentPage();
  };

  handleNameInputChange = event => {
    this.setState({ Name: event.target.value });
  };

  handlePrimaryInputChange = event => {
    this.setState({ Primary: event.target.value });
  };

  handleBranchInputChange = event => {
    // eslint-disable-next-line no-unused-expressions
    event.target.value === BRANCH_PUNGGOL
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
        >
          <option key={""} value={""} />
          <option key={BATCH_1} value={BATCH_1}>
            Batch 1
          </option>
          <option key={BATCH_2} value={BATCH_2}>
            Batch 2
          </option>
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

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { Branch } = this.state;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

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
        {Branch === BRANCH_PUNGGOL ? this.renderBatchDropDownList() : null}
        {this.renderPrimaryDropDownList()}
        <Button type="submit" primary>
          Add Student
        </Button>
      </Form>
    );
  };

  render() {
    return [<div className="add-student-form">{this.renderAddForm()}</div>];
  }
}

AddStudentForm.propTypes = {
  navToStudentPage: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({ branches });

export default connect(mapStateToProps, students)(AddStudentForm);
