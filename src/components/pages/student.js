import React from "react";
import {connect} from "react-redux";
import StudentList from "../lists/students/view-student-list";

class StudentPage extends React.Component {
    render() {
        return (
            <div className="retrieve-student">
                <StudentList/>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    user,
});

export default connect(mapStateToProps, {})(StudentPage);