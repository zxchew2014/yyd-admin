import React from "react";
import { connect } from "react-redux";
import AddStudentForm from "../forms/students/add-student";
import * as branches from "../../actions/branches";

class AddStudentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches();
  }

  render() {
    return (
      <div className="add-teacher-container">
        <AddStudentForm />
        <hr />
      </div>
    );
  }
}

export default connect(
  null,
  branches
)(AddStudentPage);
