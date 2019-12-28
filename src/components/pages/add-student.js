import React from "react";
import { connect } from "react-redux";
import AddStudentForm from "../forms/students/add-student";
import * as branches from "../../actions/branches";
import PropTypes from "prop-types";

class AddStudentPage extends React.Component {
  navToStudentPage = () => {
    const { history } = this.props;
    history.push(`/student`);
  };

  render() {
    return (
      <div className="add-student-container">
        <AddStudentForm
          key="add-student-form"
          navToStudentPage={this.navToStudentPage}
        />
        <hr />
      </div>
    );
  }
}

AddStudentPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, branches)(AddStudentPage);
