import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TeacherList from "../lists/teachers/view-teacher-list";
import * as teachers from "../../actions/teachers";

class TeacherPage extends React.Component {
  onEdit = data => {
    const { history, fetchTeacher } = this.props;
    fetchTeacher(data);
    history.push(`/teacher/edit`);
  };

  onDelete = data => {
    const { history, fetchTeacher } = this.props;
    fetchTeacher(data);
    history.push(`/teacher/remove`);
  };

  render() {
    return (
      <div className="retrieve-teacher">
        <TeacherList onEdit={this.onEdit} onDelete={this.onDelete} />
      </div>
    );
  }
}

TeacherPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, teachers)(TeacherPage);
