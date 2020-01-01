import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TeacherList from "./teacher-list";
import * as BRANCHES from "../../../actions/branches";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";

class ViewTeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: ""
    };
  }

  componentWillMount() {
    const { fetchBranchList } = this.props;
    fetchBranchList();
  }

  renderBranchDropDownList() {
    const { branches } = this.props;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches);

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
          <option key="Relief" value="Relief">
            Relief Teacher - That is not belong to any branch
          </option>
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
          onDelete={this.props.onDelete}
          onCreate={this.props.onCreate}
        />
        <hr />
      </div>
    );
  }
}

ViewTeacherList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, BRANCHES)(ViewTeacherList);
