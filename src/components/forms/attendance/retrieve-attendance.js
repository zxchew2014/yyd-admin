import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as BRANCHES from "../../../actions/branches";
import moment from "moment";
import {
  ALL_BATCH,
  DATE_UNITOFTIME_MONTH,
  DATEFORMAT_DAY_MMM_DD_YYYY,
  DATEFORMAT_YYYYDASHMMDASHDD,
  START_DATE
} from "../../../utils/common";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";
import _ from "lodash";
import { Button, Form } from "semantic-ui-react";
import InlineError from "../../utils/inline-error";

class RetrieveAttendanceForm extends React.Component {
  constructor(props) {
    super(props);

    let now = moment();
    let currentYear = now.year().toString();
    let currentDate = now
      .startOf(DATE_UNITOFTIME_MONTH)
      .format(DATEFORMAT_DAY_MMM_DD_YYYY);

    this.state = {
      data: {
        checkType: "Check In",
        year: currentYear,
        date: currentDate,
        branch: ""
      },
      errors: {}
    };
  }

  UNSAFE_componentWillMount() {
    const { fetchBranchList } = this.props;
    fetchBranchList();
  }

  handleBranchInputChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  };

  onChangeDate = event => {
    let date = new Date(event.target.value);
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: date.toDateString(),
        year: date.getFullYear().toString()
      }
    });
  };

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { data } = this.state;
    const { date } = data;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

    const FORM_FIELD_BRANCH = () => (
      <Form.Field required>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="branch"
          id="branch"
          onChange={this.handleBranchInputChange}
          required
        >
          <option key="" defaultValue="" />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    const FORM_FIELD_DATE = () => (
      <Form.Field required>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          ref="date"
          name="date"
          type="date"
          onChange={this.onChangeDate}
          min={START_DATE}
          value={moment(date).format(DATEFORMAT_YYYYDASHMMDASHDD) || ""}
          required
        />
      </Form.Field>
    );

    return (
      <Form onSubmit={this.onSubmit}>
        {FORM_FIELD_BRANCH()}
        {FORM_FIELD_DATE()}
        <Button type="submit" primary>
          Submit
        </Button>
        {JSON.stringify(data)}
      </Form>
    );
  }
}

RetrieveAttendanceForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, BRANCHES)(RetrieveAttendanceForm);
