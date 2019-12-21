import React from "react";
import { connect } from "react-redux";
import AddTeacherForm from "../forms/teachers/add-teacher";
import * as branches from "../../actions/branches";
import PropTypes from "prop-types";

class AddTeacherPage extends React.Component {
  navToTeacherPage = () => {
    const { history } = this.props;
    history.push(`/teacher`);
  };

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches();
  }

  render() {
    return (
      <div className="add-teacher-container">
        <AddTeacherForm
          key="add-teacher-form"
          navToTeacherPage={this.navToTeacherPage}
        />
      </div>
    );
  }
}

AddTeacherPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, branches)(AddTeacherPage);
