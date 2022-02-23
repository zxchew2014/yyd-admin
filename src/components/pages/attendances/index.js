import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as attendances from "../../../actions/attendances";
import RetrieveAttendanceForm from "../../forms/attendance/retrieve-attendance";

class AttendancePage extends  React.Component{
    onEdit = data => {
        const { history, fetchAttendance } = this.props;
        fetchAttendance(data);
        history.push(`/attendance/edit`);
    };

    onDelete = data => {
        const { history, fetchAttendance } = this.props;
        fetchAttendance(data);
        history.push(`/attendance/remove`);
    };

    onSubmit = data => {
        const { fetchAttendanceList } = this.props;
        fetchAttendanceList(data).then(() =>
            this.setState({
                ...data
            })
        );
    };

    render() {
        return (
            <div className="retrieve-attendance">
                <RetrieveAttendanceForm
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }

}

AttendancePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default connect(null, attendances)(AttendancePage);