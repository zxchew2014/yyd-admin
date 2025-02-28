import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import RetrieveTeacherAttendanceForm from "../../forms/attendance/teacher-attendance";
import TeacherAttendanceListByBranch from "../../lists/teachers/teacher-attendance-list-by-branch";
import * as attendances from "../../../actions/attendances";

class TeacherAttendancePage extends React.Component {
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
    const { startDate, endDate, branch, batch, level} = this.state;
    const { attendanceTeachers } = this.props;

    return (
        <React.Fragment key="teacher-attendance-page">
            <h1>Retrieve Teacher Attendance</h1>
            <RetrieveTeacherAttendanceForm submit={this.submit}/>
            <hr/>

            {attendanceTeachers
                ? attendanceTeachers.length > 0
                    ? [
                      <React.Fragment key="teacher-attendance-list-by-branch">
                        <TeacherAttendanceListByBranch
                            startDate={startDate}
                            endDate={endDate}
                            branch={branch}
                            batch={batch}
                            level={level}
                        />
                        <br/>
                      </React.Fragment>

                    ]
                    : [
                      <React.Fragment key="no-attendance-found">
                        <Message warning>
                          <Message.Header>
                            No attendance was found during{" "}
                            {startDate === endDate
                                ? startDate
                                : `${startDate} - ${endDate}`}
                            .
                          </Message.Header>
                        </Message>
                        <br/>
                      </React.Fragment>
                    ]
                : null}
        </React.Fragment>
    );
  }
}

const mapStateToProps = ({attendanceTeachers}) => ({
  attendanceTeachers
});

export default connect(mapStateToProps, attendances)(TeacherAttendancePage);
