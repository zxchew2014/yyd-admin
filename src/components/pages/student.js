import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StudentList from "../lists/students/view-student-list";

class StudentPage extends React.Component {
  render() {
    return (
      <div className="retrieve-student">
        <StudentList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

StudentPage.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {}
)(StudentPage);
