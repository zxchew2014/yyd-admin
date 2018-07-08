import React from "react";
import { connect } from "react-redux";
import AddTeacherForm from "../forms/teachers/add-teacher";
import TeacherList from "../lists/teachers/teacher-list";
import * as branches from "../../actions/branches";

class AddTeacherPage extends React.Component {
  componentWillMount() {
    this.props.getBranch();
  }

  render() {
    const { branch } = this.props;
    return (
      <div className="add-teacher-container">
        <AddTeacherForm />
        {branch !== "" ? <TeacherList branch={branch} /> : null}
        <hr />
      </div>
    );
  }
}

function mapStateToProps({ branch }) {
  return {
    branch
  };
}

export default connect(
  mapStateToProps,
  branches
)(AddTeacherPage);
