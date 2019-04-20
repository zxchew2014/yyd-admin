import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import RetrieveTeacherAttendanceForm from "../forms/attendance/teacher-attendance";
import TeacherAttendanceList from "../lists/teachers/teacher-attendance-list";
import * as attendances from "../../actions/attendances";

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: ""
    };
  }

  submit = data => {
    const { fetchTeacherAttendanceClockOut } = this.props;
    fetchTeacherAttendanceClockOut(data).then(() =>
      this.setState({
        endDate: data.endDate,
        startDate: data.startDate
      })
    );
  };

  render() {
    const { startDate, endDate } = this.state;
    const { attendanceTeachers } = this.props;
    return (
      <div>
        <h1>Select Teacher Attendance</h1>
        <RetrieveTeacherAttendanceForm submit={this.submit} />
        <hr />

        {attendanceTeachers !== null ? (
          attendanceTeachers.length > 0 ? (
            <TeacherAttendanceList startDate={startDate} endDate={endDate} />
          ) : (
            <Message warning>
              <Message.Header>
                No attendance was found during{" "}
                {startDate === endDate
                  ? startDate
                  : `${startDate} - ${endDate}`}.
              </Message.Header>
            </Message>
          )
        ) : null}
        <br />
      </div>
    );
  }
}

const mapStateToProps = ({ attendanceTeachers }) => ({
  attendanceTeachers
});

export default connect(
  mapStateToProps,
  attendances
)(AttendancePage);
