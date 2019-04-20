import React from "react";
import { connect } from "react-redux";
import ViewStudentList from "../lists/students/view-student-list";

class StudentPage extends React.Component {
  render() {
    return (
      <div className="retrieve-student">
        <ViewStudentList />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(StudentPage);
