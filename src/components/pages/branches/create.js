import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import AddBranchForm from "../../forms/branches/add-branch";

class AddBranchPage extends React.Component {
  navToBranchPage = () => {
    const { history } = this.props;
    history.push(`/branch`);
  };

  render() {
    return (
      <div className="add-branch-container">
        <AddBranchForm
          key="add-branch-form"
          navToBranchPage={this.navToBranchPage}
        />
      </div>
    );
  }
}

AddBranchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, branches)(AddBranchPage);
