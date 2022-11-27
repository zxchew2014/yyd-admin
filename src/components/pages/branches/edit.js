import React from "react";
import { connect } from "react-redux";
import EditBranchForm from "../../forms/branches/edit-branch";
import PropTypes from "prop-types";
import * as action_branches from "../../../actions/branches";

class EditBranchPage extends React.Component {
  onBack = () => {
    const { history , clearBranch} = this.props;
    clearBranch();
    history.push(`/branch`);
  };

  render() {
    const { branch, history } = this.props;
    if (branch === null || branch === "") {
      history.push(`/branch`);
    }

    return (
      <div className="edit-branch-container">
        <EditBranchForm onBack={this.onBack} />
      </div>
    );
  }
}

EditBranchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = ({ branch }) => ({
  branch
});

export default connect(mapStateToProps, action_branches)(EditBranchPage);
