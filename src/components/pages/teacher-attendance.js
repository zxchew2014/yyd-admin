import React from "react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";
import RetrieveTeacherAttendanceForm from "../forms/attendance/teacher-attendance";
import TeacherAttendanceList from "../lists/teachers/teacher-attendance-list";
import * as attendances from "../../actions/attendances";

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      loading: true,
      empty: true
    };
  }

  submit = data => {
    const { fetchTeacherAttendanceClockOut } = this.props;
    fetchTeacherAttendanceClockOut(data).then(() =>
      this.setState({
        endDate: data.endDate,
        startDate: data.startDate,
        loading: false,
        empty: false
      })
    );
  };

  render() {
    const { startDate, endDate, loading, empty } = this.state;
    const { attendanceTeachers } = this.props;
    return (
      <div>
        <h1>Select Teacher Attendance</h1>
        <RetrieveTeacherAttendanceForm submit={this.submit} />
        <hr />
        {attendanceTeachers.length > 0 ? (
          <TeacherAttendanceList startDate={startDate} endDate={endDate} />
        ) : empty ? null : loading ? (
          <div className="loader">
            <ScaleLoader loading={loading} color="black" />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user, attendanceTeachers }) => ({
  user,
  attendanceTeachers
});

export default connect(
  mapStateToProps,
  attendances
)(AttendancePage);
