import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import * as BRANCHES from "../../../actions/branches";
import StudentList from "./student-list";
import { BATCH_1, BATCH_2, BRANCH_PUNGGOL } from "../../../utils/common";
import PropTypes from "prop-types";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";

class ViewStudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      batch: ""
    };
  }

  componentWillMount() {
    const { fetchBranchList } = this.props;
    fetchBranchList();
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
    const { branches } = this.props;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

    const FORM_FIELD_BRANCH = () => (
      <Form.Field>
        {/* eslint-disable-next-line */}
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
        {/* eslint-disable-next-line */}
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
        {branch !== BRANCH_PUNGGOL ? (
          <StudentList
            key="student-list"
            id="student-list"
            branch={branch}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            onCreate={this.props.onCreate}
          />
        ) : batch || batch === "" ? (
          <StudentList
            key="student-list-punggol"
            id="student-list-punggol"
            branch={branch}
            batch={batch}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            onCreate={this.props.onCreate}
          />
        ) : null}
      </div>
    );
  }
}

ViewStudentList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, BRANCHES)(ViewStudentList);
