import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import BranchList from "../../lists/branches/branch-list";

class BranchPage extends React.Component {
  onCreate = () => {
    const { history } = this.props;
    history.push(`/branch/add`);
  };

  onSetNotActive = data => {
    const { history, fetchBranch } = this.props;
    fetchBranch(data);
    history.push(`/branch/update`);
  };

  onSetActive = data => {
    const { history, updateBranch } = this.props;
    data.Active = true;
    updateBranch(data);
    history.push(`/branch`);
  };

  onDelete = data => {
    const { history, removeBranch } = this.props;
    removeBranch(data);
    history.push(`/branch`);
  };

  onEdit = data => {
    const { history, fetchBranch } = this.props;
    fetchBranch(data);
    history.push(`/branch/edit`);
  };

  render() {
    return (
      <React.Fragment key="branch-page">
        <BranchList
          onCreate={this.onCreate}
          onSetNotActive={this.onSetNotActive}
          onSetActive={this.onSetActive}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />
      </React.Fragment>
    );
  }
}

BranchPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, branches)(BranchPage);
