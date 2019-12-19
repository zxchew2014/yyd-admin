import React from "react";
import { connect } from "react-redux";
import ViewStudentList from "../lists/students/view-student-list";
import PropTypes from "prop-types";
import * as students from "../../actions/students";

class StudentPage extends React.Component {
  onEdit = (data, id) => {
    const { history, fetchStudent } = this.props;
    fetchStudent(data);
    history.push(`/student/edit`);
  };

  render() {
    return (
      <div className="retrieve-student">
        <ViewStudentList onEdit={this.onEdit} />
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
