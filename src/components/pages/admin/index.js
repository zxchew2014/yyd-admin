import React from "react";
import { connect } from "react-redux";
import * as action_admin from "../../../actions/admins";
import PropTypes from "prop-types";
import AdminList from "../../lists/admins/admin-list";

class AdminPage extends React.Component {
  onCreate = () => {
    const { history } = this.props;
    history.push(`/admin/add`);
  };

  onEdit = data => {
    const { history, fetchEditAdmin } = this.props;
    fetchEditAdmin(data);
    history.push(`/admin/edit`);
  };

  onDemote = data => {
    const { history, updateAdmin } = this.props;
    data.isSuperAdmin = false;
    data.role = "Admin";
    updateAdmin(data);
    history.push(`/admin`);
  };

  onPromote = data => {
    const { history, updateAdmin } = this.props;
    data.isSuperAdmin = true;
    data.role = "Super Admin";
    updateAdmin(data);
    history.push(`/admin`);
  };

  onDelete = data => {
    const { history, removeAdmin } = this.props;
    removeAdmin(data);
    history.push(`/admin`);
  };

  render() {
    return (
      <div className="retrieve-admin">
        <AdminList
          onCreate={this.onCreate}
          onPromote={this.onPromote}
          onDemote={this.onDemote}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />
      </div>
    );
  }
}

AdminPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, action_admin)(AdminPage);
