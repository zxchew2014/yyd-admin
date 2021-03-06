import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import InlineError from "../../utils/inline-error";
import * as branchAPI from "../../../actions/branches";
import {
  START_DATE,
  DATEFORMAT_YYYYDASHMMDASHDD,
  DATE_UNITOFTIME_MONTH,
  DATEFORMAT_DAY_MMM_DD_YYYY,
  ENDATE_ERROR_MESSAGE,
  STARTDATE_ERROR_MESSAGE,
  BATCH_1,
  BATCH_2,
  BRANCH_PUNGGOL
} from "../../../utils/common";

const moment = require("moment");

class RetrieveTeacherAttendanceForm extends React.Component {
  state = {
    data: {
      startDate: moment()
        .startOf(DATE_UNITOFTIME_MONTH)
        .format(DATEFORMAT_DAY_MMM_DD_YYYY),
      endDate: new Date().toDateString(),
      branch: ""
    },
    errors: {}
  };

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
        [event.target.name]: event.target.value
      }
    });
  };

  validateDate = data => {
    const { startDate, endDate } = data;
    const errors = {};

    if (new Date(endDate) < new Date(startDate)) {
      errors.endDate = ENDATE_ERROR_MESSAGE;
    }
    if (new Date(startDate) > new Date(endDate)) {
      errors.startDate = STARTDATE_ERROR_MESSAGE;
    }

    return errors;
  };

  render() {
    const { errors, data } = this.state;
    const { branch, endDate, startDate } = data;
    const { branches } = this.props;

    if (branches === null) return null;
    const BRANCH_OPTIONS = Object.keys(branches).map(key => {
      const branch = branches[key];
      return (
        <option key={branch.Branch_Name} defaultValue={branch.Branch_Name}>
          {branch.Branch_Name}
        </option>
      );
    });

    const FORM_FIELD_BRANCH = () => (
      <Form.Field required>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="branch"
          id="branch"
          onChange={this.handleBranchInputChange}
          value={branch || ""}
        >
          {branch !== "" ? (
            <option key="" defaultValue="" />
          ) : (
            ((<option key={branch} defaultValue={branch} />),
            (<option key="" defaultValue="" />))
          )}
          <option key="All" defaultValue="All" value="All">
            All Branches
          </option>
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    const FORM_FIELD_START_DATE = () => (
      <Form.Field error={!!errors.startDate} required>
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          ref="start-date"
          name="startDate"
          type="date"
          onChange={this.onChangeDate}
          min={START_DATE}
          value={moment(startDate).format(DATEFORMAT_YYYYDASHMMDASHDD) || ""}
          required
        />
        {errors.startDate && <InlineError text={errors.startDate} />}
      </Form.Field>
    );

    const FORM_FIELD_END_DATE = () => (
      <Form.Field error={!!errors.endDate} required>
        <label htmlFor="end-date">End Date</label>
        <input
          id="end-date"
          ref="end-date"
          name="endDate"
          type="date"
          onChange={this.onChangeDate}
          min={START_DATE}
          value={moment(endDate).format(DATEFORMAT_YYYYDASHMMDASHDD) || ""}
          required
        />
        {errors.endDate && <InlineError text={errors.endDate} />}
      </Form.Field>
    );

    return [
      <Form onSubmit={this.onSubmit}>
        {FORM_FIELD_BRANCH()}
        {FORM_FIELD_START_DATE()}
        {FORM_FIELD_END_DATE()}
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    ];
  }
}

RetrieveTeacherAttendanceForm.propTypes = {
  submit: PropTypes.func
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(
  mapStateToProps,
  branchAPI
)(RetrieveTeacherAttendanceForm);
