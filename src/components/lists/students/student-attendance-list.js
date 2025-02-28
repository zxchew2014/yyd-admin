import React from "react";
import PropTypes from "prop-types";
import GenerateStudentAttendanceList from "./generate-student-attendance-list";

class StudentAttendanceList extends React.Component {
  render() {
    const { startDate, endDate, branch, batch, level } = this.props;

    return (
      <React.Fragment key="student-attendance-list">
        <GenerateStudentAttendanceList
          startDate={startDate}
          endDate={endDate}
          branch={branch}
          batch={batch}
          level={level}
        />
        <hr />
      </React.Fragment>
    );
  }
}

StudentAttendanceList.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string,
  level: PropTypes.string
};

export default StudentAttendanceList;
