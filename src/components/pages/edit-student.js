import React from "react";
import { connect } from "react-redux";
import AddStudentForm from "../forms/students/add-student";

class EditStudentPage extends React.Component {
  render() {
    return (
      <div className="edit-teacher-container">
        <AddStudentForm />
        <hr />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(EditStudentPage);
