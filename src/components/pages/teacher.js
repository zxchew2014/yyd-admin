import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TeacherList from "../lists/teachers/view-teacher-list";
import * as TEACHERS from "../../actions/teachers";

class TeacherPage extends React.Component {
  onEdit = data => {
    const { history, fetchTeacher } = this.props;
    fetchTeacher(data);
    history.push(`/teacher/edit`);
  };

  render() {
    return (
      <div className="retrieve-teacher">
        <TeacherList onEdit={this.onEdit} />
      </div>
    );
  }
}

TeacherPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  TEACHERS
)(TeacherPage);
