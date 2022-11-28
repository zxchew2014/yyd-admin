import React from "react";
import { Button, Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InlineError from "../../utils/inline-error";
import * as branchAPI from "../../../actions/branches";
import {
  DATE_UNITOFTIME_MONTH,
  DATEFORMAT_DAY_MMM_DD_YYYY,
  BATCH_1,
  BATCH_2,
  DATEFORMAT_YYYYDASHMMDASHDD,
  START_DATE,
  BRANCH_PUNGGOL,
  ENDATE_ERROR_MESSAGE,
  STARTDATE_ERROR_MESSAGE,
  ALL_BATCH,
  EDUCATION_LEVEL
} from "../../../utils/common";
import _ from "lodash";

const moment = require("moment");

class RetrieveStudentAttendanceForm extends React.Component {
  state = {
    data: {
      startDate: moment()
        .startOf(DATE_UNITOFTIME_MONTH)
        .format(DATEFORMAT_DAY_MMM_DD_YYYY),
      endDate: new Date().toDateString(),
      branch: "",
      batch: "",
      level: "Primary"
    },
    errors: {}
  };

  UNSAFE_componentWillMount() {
    const { fetchBranchList } = this.props;
    const { level } = this.state;
    fetchBranchList(level);
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

  handleInputChange = event => {
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

  handleRadioInputChange = event => {
    const { fetchBranchList } = this.props;
    const { data } = this.state;
    fetchBranchList(event.target.value);
    this.setState({
      data: { ...data, [event.target.name]: event.target.value }
    });
  };

  render() {
    const { errors, data } = this.state;
    const { branch, batch, endDate, startDate, level } = data;
    const { branches } = this.props;

    const BRANCH_OPTIONS = Object.keys(branches).map(key => {
      const branch = branches[key];
      return (
        <option key={branch.Branch_Name} defaultValue={branch.Branch_Name}>
          {branch.Branch_Name}
        </option>
      );
    });

    const BATCH_OPTIONS = _.map(ALL_BATCH, value => (
      <option key={value} value={value}>
        BATCH {value}
      </option>
    ));

    const FORM_FIELD_BRANCH = () => (
      <Form.Field required>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="branch"
          id="branch"
          onChange={this.handleInputChange}
          value={branch || ""}
          required
        >
          <option key={branch || ""} defaultValue={branch || ""} />
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
        <label htmlFor="start-date">End Date</label>
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

    const FORM_FIELD_LEVEL = () => (
      <Form.Field required>
        <label htmlFor="Level">Level</label>
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
        onChange={this.handleRadioInputChange}
      />
    ));

    return [
      <Form onSubmit={this.onSubmit}>
        {FORM_FIELD_LEVEL()}
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

RetrieveStudentAttendanceForm.propTypes = {
  submit: PropTypes.func
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(
  mapStateToProps,
  branchAPI
)(RetrieveStudentAttendanceForm);
