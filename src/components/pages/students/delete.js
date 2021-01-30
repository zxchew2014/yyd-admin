import React from "react";
import DeleteStudentForm from "../../forms/students/delete-student";
import PropTypes from "prop-types";

class RemoveStudentPage extends React.Component {
  navToPreviousPage = () => {
    const { history } = this.props;
    history.push(`/student`);
  };

  navToStudentPage = () => {
    const { history } = this.props;
    history.push(`/student`);
  };

  render() {
    const { student, history } = this.props;
    if (student === null) {
      history.push(`/student`);
    }

    return (
      <div className="delete-student-container">
        <DeleteStudentForm
          key="delete-student-form"
          navToPreviousPage={this.navToPreviousPage}
          navToStudentPage={this.navToStudentPage}
        />
      </div>
    );
  }
}

RemoveStudentPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default RemoveStudentPage;
