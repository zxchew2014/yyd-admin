import React from "react";
import { connect } from "react-redux";
import ViewStudentList from "../../lists/students/view-student-list";
import PropTypes from "prop-types";
import * as students from "../../../actions/students";
import ResistMessage from "../../utils/resist-message";

class StudentPage extends React.Component {
  onEdit = data => {
    const { history, fetchStudent } = this.props;
    fetchStudent(data);
    history.push(`/student/edit`);
  };

  onDelete = data => {
    const { history, fetchStudent } = this.props;
    fetchStudent(data);
    history.push(`/student/remove`);
  };

  onCreate = () => {
    const { history } = this.props;
    history.push(`/student/add`);
  };

  render() {
    const { admin } = this.props;
    if (admin === null) {
      return <ResistMessage />;
    }

    return (
      <div className="retrieve-student">
        <ViewStudentList
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          onCreate={this.onCreate}
        />
      </div>
    );
  }
}

StudentPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = ({ admin }) => ({
  admin
});

export default connect(mapStateToProps, students)(StudentPage);
