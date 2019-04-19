import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GenerateStudentAttendanceList from "./generate-student-attendance-list";

class StudentAttendanceList extends React.Component {
  render() {
    const { startDate, endDate, branch, batch } = this.props;

    return [
      <GenerateStudentAttendanceList
        startDate={startDate}
        endDate={endDate}
        branch={branch}
        batch={batch}
      />,
      <hr />
    ];
  }
}

StudentAttendanceList.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string
};

export default connect(
  null,
  {}
)(StudentAttendanceList);
