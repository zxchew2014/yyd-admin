import React from "react";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GenerateStudentAttendanceList from "./generate-student-attendance-list";

class StudentAttendanceList extends React.Component {
  render() {
    const {
      startDate,
      endDate,
      branch,
      batch,
      attendanceStudents
    } = this.props;
    if (attendanceStudents.length === 0) {
      return [
        <Message warning>
          <Message.Header>
            No attendance was found during{" "}
            {startDate === endDate ? startDate : `${startDate} - ${endDate}`}.
          </Message.Header>
        </Message>
      ];
    }
    if (attendanceStudents.length > 0) {
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

    return null;
  }
}

StudentAttendanceList.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string
};

const mapStateToProps = ({ attendanceStudents }) => ({
  attendanceStudents
});

export default connect(
  mapStateToProps,
  {}
)(StudentAttendanceList);
