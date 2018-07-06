import React from 'react';
import RetrieveTeacherAttendanceForm from '../forms/attendance/teacher-attendance';
import TeacherAttendanceList from '../lists/teachers/teacher-attendance-list';
import { connect } from 'react-redux';
import * as attendances from '../../actions/attendances';
import { ScaleLoader } from 'react-spinners';

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
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
    const { attendance_teachers } = this.props;
    return (
      <div>
        <h1>Select Teacher Attendance</h1>
        <RetrieveTeacherAttendanceForm submit={this.submit} />
        <hr />
        {attendance_teachers.length > 0 ? (
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

function mapStateToProps({ user, attendance_teachers }) {
  return {
    user,
    attendance_teachers
  };
}

export default connect(mapStateToProps, attendances)(AttendancePage);
