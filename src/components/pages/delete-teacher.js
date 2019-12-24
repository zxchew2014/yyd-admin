import React from "react";
import DeleteTeacherForm from "../forms/teachers/delete-teacher";
import PropTypes from "prop-types";

class RemoveTeacherPage extends React.Component {
  navToTeacherPage = () => {
    const { history } = this.props;
    history.push(`/teacher`);
  };

  render() {
    const { teacher, history } = this.props;
    if (teacher === null) {
      history.push(`/teacher`);
    }

    return (
      <div className="delete-teacher-container">
        <DeleteTeacherForm
          key="delete-teacher-form"
          navToTeacherPage={this.navToTeacherPage}
        />
      </div>
    );
  }
}

RemoveTeacherPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default RemoveTeacherPage;
