import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AttendanceListByBranch from "./attendance-list-by-branch";

class TeacherAttendanceListByBranch extends React.Component {
  render() {
    const { startDate, endDate, branch, batch } = this.props;

    return [
      <AttendanceListByBranch
        startDate={startDate}
        endDate={endDate}
        branch={branch}
        batch={batch}
      />,
      <hr />
    ];
  }
}

TeacherAttendanceListByBranch.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string
};

export default connect(null, {})(TeacherAttendanceListByBranch);
