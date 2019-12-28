import React from "react";
import PropTypes from "prop-types";
import UpdateBranchForm from "../../forms/branches/update-branch";

class UpdateBranchPage extends React.Component {
  navToBranchPage = () => {
    const { history } = this.props;
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
          key="delete-branch-form"
          navToBranchPage={this.navToBranchPage}
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

export default UpdateBranchPage;
