import React from "react";
import { connect } from "react-redux";
import ViewStudentList from "../lists/students/view-student-list";
import PropTypes from "prop-types";
import * as students from "../../actions/students";

class StudentPage extends React.Component {
  onEdit = data => {
    const { history, fetchStudent } = this.props;
    fetchStudent(data);
    history.push(`/student/edit`);
  };

  onDelete = data => {
    const { history, fetchStudent } = this.props;
    fetchStudent(data);
    history.push(`/student/remove`);
  };

  render() {
    return (
      <div className="retrieve-student">
        <ViewStudentList onEdit={this.onEdit} onDelete={this.onDelete} />
      </div>
    );
  }
}

StudentPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, students)(StudentPage);
