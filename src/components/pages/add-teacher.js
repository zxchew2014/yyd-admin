import React from "react";
import { connect } from "react-redux";
import AddTeacherForm from "../forms/teachers/add-teacher";
import TeacherList from "../lists/teachers/teacher-list";
import * as branches from "../../actions/branches";

class AddTeacherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      loading: true
    };
  }

  componentWillMount() {
    const { fetchBranches } = this.props;
    fetchBranches().then(this.setState({ loading: false }));
  }

  render() {
    const { branch } = this.props;
    return (
      <div className="add-teacher-container">
        <AddTeacherForm />
        {branch !== "" ? <TeacherList branch={branch} /> : null}
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(
  mapStateToProps,
  branches
)(AddTeacherPage);
