import React from "react";
import {connect} from "react-redux";
import {Message} from "semantic-ui-react";
import RetrieveTeacherAttendanceForm from "../forms/attendance/teacher-attendance";
import TeacherAttendanceList from "../lists/teachers/teacher-attendance-list";
import TeacherAttendanceListByBranch from "../lists/teachers/teacher-attendance-list-by-branch";
import * as attendances from "../../actions/attendances";

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
        const {fetchTeacherAttendanceClockOut, fetchAllTeacherAttendanceClockOut} = this.props;

        if (data.branch === "") {
            fetchAllTeacherAttendanceClockOut(data).then(() =>
                this.setState({
                    endDate: data.endDate,
                    startDate: data.startDate,
                    branch: ""
                })
            );
        } else {
            fetchTeacherAttendanceClockOut(data).then(() =>
                this.setState({
                    endDate: data.endDate,
                    startDate: data.startDate,
                    branch: data.branch,
                    batch: data.batch
                })
            );
        }

    };

    render() {
        const {startDate, endDate, branch, batch} = this.state;
        const {attendanceTeachers} = this.props;

        if (attendanceTeachers !== null) {
            if (attendanceTeachers.length > 0) {
                // Return Teacher Attendance List by Branch
                if (branch !== "") {
                    return (
                        <div>
                            <h1>Select Teacher Attendance</h1>
                            <RetrieveTeacherAttendanceForm submit={this.submit}/>
                            <hr/>

                            <TeacherAttendanceListByBranch
                                startDate={startDate}
                                endDate={endDate}
                                branch={branch}
                                batch={batch}
                            />
                            <br/>
                        </div>
                    );
                }
                // Return All Teacher Attendance in 1 list
                return (
                    <div>
                        <h1>Select Teacher Attendance</h1>
                        <RetrieveTeacherAttendanceForm submit={this.submit}/>
                        <hr/>

                        <TeacherAttendanceList
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <br/>
                    </div>
                );

            }
            return (
                <div>
                    <h1>Select Teacher Attendance</h1>
                    <RetrieveTeacherAttendanceForm submit={this.submit}/>
                    <hr/>

                    <Message warning>
                        <Message.Header>
                            No attendance was found during{" "}
                            {startDate === endDate
                                ? startDate
                                : `${startDate} - ${endDate}`}.
                        </Message.Header>
                    </Message>
                    <br/>
                </div>
            )
        }
        return (
            <div>
                <h1>Select Teacher Attendance</h1>
                <RetrieveTeacherAttendanceForm submit={this.submit}/>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = ({attendanceTeachers}) => ({
    attendanceTeachers
});

export default connect(mapStateToProps, attendances)(AttendancePage);
