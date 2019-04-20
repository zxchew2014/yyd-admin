import React from "react";
import { connect } from "react-redux";
import AddStudentForm from "./edit-student";

class EditTeacherPage extends React.Component {
  render() {
    return (
      <div className="edit-teacher-container">
        <AddStudentForm />
      </div>
    );
  }
}

export default connect(null, {})(EditTeacherPage);
