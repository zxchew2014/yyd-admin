import React from "react";
import PropTypes from "prop-types";
import UpdateBranchForm from "../../forms/branches/update-branch";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";

class UpdateBranchPage extends React.Component {
  onBack = () => {
    const { history, getBranch } = this.props;
    getBranch();
    history.push(`/branch`);
  };

  onSubmit = branch => {
    const { updateBranch, history } = this.props;
    branch.Active = false;
    updateBranch(branch);
    history.push(`/branch`);
  };

  render() {
    const { branch, history } = this.props;

    if (branch === null) {
      history.push(`/branch`);
    }

    return (
      <div className="delete-branch-container">
        <UpdateBranchForm
          key="update-branch-form"
          onBack={this.onBack}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

UpdateBranchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, branches)(UpdateBranchPage);
