import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AttendanceListByBranch from "./attendance-list-by-branch";

class TeacherAttendanceListByBranch extends React.Component {
  render() {
    const { startDate, endDate, branch, batch, level } = this.props;

    return (
        <React.Fragment key="teacher-attendance-list">
          <AttendanceListByBranch
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

TeacherAttendanceListByBranch.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string,
  level: PropTypes.string
};

export default connect(null, {})(TeacherAttendanceListByBranch);
