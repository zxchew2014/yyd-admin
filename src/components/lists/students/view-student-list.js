import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import * as BRANCHES from "../../../actions/branches";
import StudentList from "./student-list";

class ViewStudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      loading: true
    };
  }

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches().then(this.setState({ loading: false }));
  }

  renderBranchDropDownList() {
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
          onChange={event => this.setState({ branch: event.target.value })}
          required
        >
          <option key="" defaultValue="" />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return <Form>{FORM_FIELD_BRANCH()}</Form>;
  }

  render() {
    const { branch } = this.state;

    return (
      <div className="teacher-list-container">
        {this.renderBranchDropDownList()}
        <StudentList id="student_list" branch={branch} />
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(
  mapStateToProps,
  BRANCHES
)(ViewStudentList);
