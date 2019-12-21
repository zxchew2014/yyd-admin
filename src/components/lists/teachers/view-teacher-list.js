import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import TeacherList from "./teacher-list";
import * as BRANCHES from "../../../actions/branches";

class ViewTeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: ""
    };
  }

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches();
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
        <TeacherList
          key="teacher-list"
          id="teacher_list"
          branch={branch}
          onEdit={this.props.onEdit}
        />
        <hr />
      </div>
    );
  }
}

ViewTeacherList.propTypes = {
  onEdit: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, BRANCHES)(ViewTeacherList);
