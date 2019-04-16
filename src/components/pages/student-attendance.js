import React from "react";
import {connect} from "react-redux";
import RetrieveStudentAttendanceForm from "../forms/attendance/student-attendance";
import * as attendances from "../../actions/attendances";
import StudentAttendanceList from "../lists/students/student-attendance-list";

class StudentAttendancePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            branch: ""
        };
    }

    submit = data => {
        const {fetchStudentAttendanceClockOut} = this.props;
        fetchStudentAttendanceClockOut(data).then(() =>
            this.setState({
                endDate: data.endDate,
                startDate: data.startDate,
                branch: data.branch,
                batch: data.batch
            })
        );
    };

    render() {
        const {startDate, endDate, branch, batch} = this.state;
        const {attendanceStudents} = this.props;
        return (
            <div>
                <h1>Select Student Attendance</h1>
                <RetrieveStudentAttendanceForm submit={this.submit}/>
                <hr/>
                {attendanceStudents.length > 0 ? (
                    <StudentAttendanceList startDate={startDate} endDate={endDate} branch={branch} batch={batch}/>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = ({user, attendanceStudents}) => ({
    user,
    attendanceStudents
});

export default connect(mapStateToProps, attendances)(StudentAttendancePage)