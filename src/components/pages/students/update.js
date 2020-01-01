import React from "react";
import { connect } from "react-redux";
import EditStudentForm from "../../forms/students/edit-student";
import PropTypes from "prop-types";

class EditStudentPage extends React.Component {
  onBack = () => {
      const {history} = this.props;
      history.push(`/student`);
  };

  render() {
    return (
        <div className="edit-student-container">
            <EditStudentForm onBack={this.onBack}/>
            <hr/>
        </div>
    );
  }
}

EditStudentPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = ({student}) => ({
    student
});

export default connect(mapStateToProps, {})(EditStudentPage);
