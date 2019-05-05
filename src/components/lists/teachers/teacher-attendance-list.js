import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AttendanceList from "./attendance-list";

class TeacherAttendanceList extends React.Component {
    render() {
        const {startDate, endDate, branch, batch} = this.props;
        return [<AttendanceList startDate={startDate} endDate={endDate} branch={branch}
                                batch={batch}/>, <hr/>];
    }
}

TeacherAttendanceList.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    branch: PropTypes.string,
    batch: PropTypes.string
};

export default connect(
    null,
    {}
)(TeacherAttendanceList);
