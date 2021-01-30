import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditAdminForm from "../../forms/admins/edit-admin";

class EditAdminPage extends React.Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`/admin`);
  };

  render() {
    const { editAdmin } = this.props;
    if (editAdmin === null) {
      this.onBack();
    }

    return (
      <div className="edit-admin-container">
        <EditAdminForm onBack={this.onBack} />
      </div>
    );
  }
}

EditAdminPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
const mapStateToProps = ({ editAdmin }) => ({
  editAdmin
});

export default connect(mapStateToProps, {})(EditAdminPage);
