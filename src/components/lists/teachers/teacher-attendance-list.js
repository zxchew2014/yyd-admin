import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AttendanceList from "./attendance-list";

class TeacherAttendanceList extends React.Component {
    render() {
        const {startDate, endDate} = this.props;
        return [
            <AttendanceList startDate={startDate} endDate={endDate}/>,
            <hr/>
        ];
    }
}

TeacherAttendanceList.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string
};


export default connect(null, {})(TeacherAttendanceList);
