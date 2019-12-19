import React from "react";
import { connect } from "react-redux";
import EditStudentForm from "../forms/students/edit-student";
import * as branches from "../../actions/branches";
import PropTypes from "prop-types";

class EditStudentPage extends React.Component {
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
      <div className="edit-student-container">
        <EditStudentForm
          student={student}
          navToStudentPage={this.navToStudentPage}
        />
        <hr />
      </div>
    );
  }
}

EditStudentPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, branches)(EditStudentPage);
