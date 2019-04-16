import React from "react";
import { Button, Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import InlineError from "../../utils/inline-error";
import * as branches from "../../../actions/branches";

const moment = require("moment");

class RetrieveStudentAttendanceForm extends React.Component {
  state = {
    data: {
      startDate: moment()
        .startOf("month")
        .format("ddd MMM DD YYYY"),
      endDate: new Date().toDateString(),
      branch: ""
    },
    errors: {}
  };

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches();
  }

  onChangeDate = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: new Date(event.target.value).toDateString()
      }
    });
  };

  onSubmit = event => {
    const { submit } = this.props;
    const { data } = this.state;
    const errors = this.validateDate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      event.preventDefault();
      submit(data);
    } else {
      window.scrollTo(0, 0);
    }
  };

  handleBranchInputChange = event => {
    const { data } = this.state;

    this.setState({
      data: {
        ...data,
        [event.target.name]: event.target.value,
        batch: ""
      }
    });
  };

  handleBatchInputChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  validateDate = data => {
    const { startDate, endDate } = data;
    const errors = {};

    if (new Date(endDate) < new Date(startDate)) {
      errors.endDate = "End Date is smaller than Start Date";
    }
    if (new Date(startDate) > new Date(endDate)) {
      errors.startDate = "Start Date is greater than End Date";
    }

    return errors;
  };

  render() {
    const { errors, loading, data } = this.state;
    const { branch, batch, endDate, startDate } = data;
    const { branches } = this.props;

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
          value={branch || ""}
          required
        >
          <option key={branch || ""} defaultValue={branch || ""} />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    const FORM_FIELD_BATCH = () => (
      <Form.Field>
        <label htmlFor="batch">Batch</label>
        <select
          ref="batch"
          name="batch"
          id="batch"
          onChange={this.handleBatchInputChange}
          value={batch || ""}
          required
        >
          <option key={batch || ""} defaultValue={batch || ""} />
          <option key="1" value="1">
            Batch 1
          </option>
          <option key="2" value="2">
            Batch 2
          </option>
        </select>
      </Form.Field>
    );

    const FORM_FIELD_START_DATE = () => (
      <Form.Field error={!!errors.startDate}>
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          ref="start-date"
          name="startDate"
          type="date"
          onChange={this.onChangeDate}
          min="2019-01-01"
          value={moment(startDate).format("YYYY-MM-DD") || ""}
          required
        />
        {errors.startDate && <InlineError text={errors.startDate} />}
      </Form.Field>
    );

    const FORM_FIELD_END_DATE = () => (
      <Form.Field error={!!errors.endDate}>
        <label htmlFor="start-date">End Date</label>
        <input
          id="end-date"
          ref="end-date"
          name="endDate"
          type="date"
          onChange={this.onChangeDate}
          min="2019-01-01"
          value={moment(endDate).format("YYYY-MM-DD") || ""}
          required
        />
        {errors.endDate && <InlineError text={errors.endDate} />}
      </Form.Field>
    );

    return [
      <Form onSubmit={this.onSubmit} loading={loading}>
        {FORM_FIELD_BRANCH()}
        {branch === "Punggol" ? FORM_FIELD_BATCH() : null}
        {FORM_FIELD_START_DATE()}
        {FORM_FIELD_END_DATE()}
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    ];
  }
}

RetrieveStudentAttendanceForm.propTypes = {
  submit: PropTypes.func
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(
  mapStateToProps,
  branches
)(RetrieveStudentAttendanceForm);
