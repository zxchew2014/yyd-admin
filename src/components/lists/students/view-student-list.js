import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import * as BRANCHES from "../../../actions/branches";
import StudentList from "./student-list";
import { BATCH_1, BATCH_2, BRANCH_PUNGGOL } from "../../../utils/common";
import PropTypes from "prop-types";

class ViewStudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      batch: ""
    };
  }

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches();
  }

  handleBranchInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      batch: ""
    });
  };

  handleBatchInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderBranchDropDownList() {
    const { branch, batch } = this.state;
    // eslint-disable-next-line react/prop-types
    const { branches } = this.props;

    const BRANCH_OPTIONS = _.map(branches, (value, key) => (
      <option key={key} defaultValue={value}>
        {value}
      </option>
    ));

    const FORM_FIELD_BRANCH = () => (
      <Form.Field>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
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

    const FORM_FIELD_BATCH = () => (
      <Form.Field>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="batch">Batch</label>
        <select
          ref="batch"
          name="batch"
          id="batch"
          onChange={this.handleBatchInputChange}
          value={batch || ""}
          required
        >
          <option key="" defaultValue="" />
          <option key={BATCH_1} value={BATCH_1}>
            Batch 1
          </option>
          <option key={BATCH_2} value={BATCH_2}>
            Batch 2
          </option>
        </select>
      </Form.Field>
    );

    return (
      <Form>
        {FORM_FIELD_BRANCH()}
        {branch === BRANCH_PUNGGOL ? FORM_FIELD_BATCH() : null}
      </Form>
    );
  }

  render() {
    const { branch, batch } = this.state;

    return (
      <div className="student-list-container">
        {this.renderBranchDropDownList()}
        {// eslint-disable-next-line no-nested-ternary
        branch !== BRANCH_PUNGGOL ? (
          <StudentList
            id="student_list"
            branch={branch}
            onEdit={this.props.onEdit}
          />
        ) : batch || batch === "" ? (
          <StudentList
            id="student_list_punggol"
            branch={branch}
            batch={batch}
            onEdit={this.props.onEdit}
          />
        ) : null}
        <hr />
      </div>
    );
  }
}

ViewStudentList.propTypes = {
  onEdit: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, BRANCHES)(ViewStudentList);
