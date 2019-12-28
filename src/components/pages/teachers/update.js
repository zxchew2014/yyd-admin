import React from "react";
import { connect } from "react-redux";
import EditTeacherForm from "../../forms/teachers/edit-teacher";
import * as branches from "../../../actions/branches";
import PropTypes from "prop-types";

class EditTeacherPage extends React.Component {
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
      <div className="edit-teacher-container">
        <EditTeacherForm
          teacher={teacher}
          navToTeacherPage={this.navToTeacherPage}
        />
      </div>
    );
  }
}

EditTeacherPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { branches })(EditTeacherPage);
