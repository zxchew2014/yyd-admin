import React from "react";
import { connect } from "react-redux";
import EditBranchForm from "../../forms/branches/edit-branch";
import PropTypes from "prop-types";

class EditBranchPage extends React.Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`/branch`);
  };

  render() {
    const { branch, history } = this.props;

    console.log(branch);
    if (branch === null) {
      history.push(`/branch`);
    }

    return (
      <div className="edit-branch-container">
        <EditBranchForm branch={branch} onBack={this.onBack} />
        <hr />
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

export default connect(mapStateToProps, {})(EditBranchPage);
