import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import RetrieveTeacherAttendanceForm from "../../forms/attendance/teacher-attendance";
import TeacherAttendanceListByBranch from "../../lists/teachers/teacher-attendance-list-by-branch";
import * as attendances from "../../../actions/attendances";

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      branch: ""
    };
  }

  submit = data => {
    const {
      fetchAllTeacherAttendanceClockOut,
      fetchTeacherAttendanceClockOut
    } = this.props;

    if (data.branch !== "") {
      if (data.branch === "All") {
        fetchAllTeacherAttendanceClockOut(data).then(() =>
          this.setState({
            ...data
          })
        );
      } else {
        fetchTeacherAttendanceClockOut(data).then(() =>
          this.setState({
            ...data
          })
        );
      }
    }
  };

  render() {
    const { startDate, endDate, branch, batch } = this.state;
    const { attendanceTeachers } = this.props;

    return (
      <div key="teacher_attendance_form">
        <h1>Select Teacher Attendance</h1>
        <RetrieveTeacherAttendanceForm submit={this.submit} />
        <hr />

        {attendanceTeachers
          ? attendanceTeachers.length > 0
            ? [
                <TeacherAttendanceListByBranch
                  startDate={startDate}
                  endDate={endDate}
                  branch={branch}
                  batch={batch}
                />,
                <br />
              ]
            : [
                <Message warning>
                  <Message.Header>
                    No attendance was found during{" "}
                    {startDate === endDate
                      ? startDate
                      : `${startDate} - ${endDate}`}
                    .
                  </Message.Header>
                </Message>,
                <br />
              ]
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ attendanceTeachers }) => ({
  attendanceTeachers
});

export default connect(mapStateToProps, attendances)(AttendancePage);
