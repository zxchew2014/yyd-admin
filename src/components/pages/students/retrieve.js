import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import RetrieveStudentAttendanceForm from "../../forms/attendance/student-attendance";
import * as attendances from "../../../actions/attendances";

import StudentAttendanceList from "../../lists/students/student-attendance-list";

class StudentAttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      branch: "",
      level: "Primary"
    };
  }

  submit = data => {
    const { fetchStudentAttendanceClockOut } = this.props;
    fetchStudentAttendanceClockOut(data).then(() =>
      this.setState({
        ...data
      })
    );
  };

  render() {
    const { startDate, endDate, branch, batch, level } = this.state;
    const { attendanceStudents } = this.props;
    return (
      <React.Fragment key="student-attendance-page">
        <h1>Retrieve Student Attendance</h1>
        <RetrieveStudentAttendanceForm submit={this.submit} />
        <hr />
        {attendanceStudents !== null ? (
          attendanceStudents.length > 0 ? (
            <StudentAttendanceList
              startDate={startDate}
              endDate={endDate}
              branch={branch}
              batch={batch}
              level={level}
            />
          ) : (
            <Message warning key="no-attendance-found">
              <Message.Header>
                No attendance was found during{" "}
                {startDate === endDate
                  ? startDate
                  : `${startDate} - ${endDate}`}
                .
              </Message.Header>
            </Message>
          )
        ) : null}
        <br />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ attendanceStudents }) => ({
  attendanceStudents
});

export default connect(mapStateToProps, attendances)(StudentAttendancePage);
