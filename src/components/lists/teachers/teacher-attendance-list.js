import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import * as attendances from "../../../actions/attendances";
import AttendanceList from "./attendance-list";

class TeacherAttendanceList extends React.Component {
  render() {
    const { startDate, endDate, attendance_teachers } = this.props;

    if (attendance_teachers.length === 0) {
      return [
        <Message warning>
          <Message.Header>
            No attendance was found during{" "}
            {startDate === endDate ? startDate : `${startDate} - ${endDate}`}.
          </Message.Header>
        </Message>
      ];
    }

    if (attendance_teachers.length > 0) {
      return [
        <AttendanceList startDate={startDate} endDate={endDate} />,
        <hr />
      ];
    }

    return null;
  }
}

TeacherAttendanceList.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

const mapStateToProps = ({ attendance_teachers }) => ({
  attendance_teachers
});

export default connect(
  mapStateToProps,
  attendances
)(TeacherAttendanceList);
