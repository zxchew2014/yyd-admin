import React from "react";
import PropTypes from "prop-types";
import AddBranchForm from "../../forms/branches/add-branch";

class AddBranchPage extends React.Component {
  onNext = () => {
    const { history } = this.props;
    history.push(`/branch`);
  };

  render() {
    return (
      <div className="add-branch-container">
        <AddBranchForm key="add-branch-form" onNext={this.onNext} />
      </div>
    );
  }
}

AddBranchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default AddBranchPage;
