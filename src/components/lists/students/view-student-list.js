import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import * as BRANCHES from "../../../actions/branches";
import StudentList from "./student-list";
import {
  ALL_BATCH
} from "../../../utils/common";
import PropTypes from "prop-types";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";
import _ from "lodash";

class ViewStudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      batch: ""
    };
  }

  UNSAFE_componentWillMount() {
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
    const { batch } = this.state;
    const { branches } = this.props;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

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
        <label htmlFor="batch">Batch</label>
        <select
          ref="batch"
          name="batch"
          id="batch"
          onChange={this.handleBatchInputChange}
          value={batch || ""}
        >
          <option key="" defaultValue="" />
          {BATCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return (
      <Form>
        {FORM_FIELD_BRANCH()}
        {FORM_FIELD_BATCH()}
      </Form>
    );
  }

  render() {
    const { branch, batch } = this.state;

    return (
      <div className="student-list-container">
        {this.renderBranchDropDownList()}
        <StudentList
          key="student-list"
          id="student-list"
          branch={branch}
          batch={batch}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete}
          onCreate={this.props.onCreate}
        />
        <br />
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
