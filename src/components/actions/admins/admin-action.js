import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as action_admin from "../../../actions/admins";
import {Button, Icon} from "semantic-ui-react";

class AdminAction extends React.Component {
  displayEditButton = admin => {
    return (
        <Button
            key="btn-set-edit"
            icon
            labelPosition="left"
            size="small"
            color="teal"
            onClick={() => this.props.onEdit(admin)}
        >
          <Icon name="edit"/>
          Edit Admin
        </Button>
    );
  };

  displayDeleteButton = admin => {
    return (
        <Button
            key="btn-set-delete"
            icon
            labelPosition="left"
            size="small"
            color="red"
            onClick={() => this.props.onDelete(admin)}
        >
          <Icon name="trash"/>
          Remove Admin
        </Button>
    );
  };

  displayPromoteButton = admin => {
    return (
        <Button
            key="btn-set-promote"
            icon
            labelPosition="left"
            size="small"
            color="green"
            onClick={() => this.props.onPromote(admin)}
        >
          <Icon name="linkify"/> Promote to Super Admin
        </Button>
    );
  };

  displayDemoteButton = admin => {
    return (
        <Button
            key="btn-set-demote"
            icon
            labelPosition="left"
            size="small"
            color="orange"
            onClick={() => this.props.onDemote(admin)}
        >
          <Icon name="unlink"/>
          Demote to Admin
        </Button>
    );
  };

  render() {
    const {admin, currentAdmin} = this.props;
    if (admin === null) return null;

    if (admin.role !== "Admin") {
      if (currentAdmin.emailAddress !== admin.emailAddress) {
        if (currentAdmin.role === "Owner") return null;

        if (currentAdmin.isSuperAdmin) {
          return [
            this.displayDemoteButton(currentAdmin),
            this.displayEditButton(currentAdmin),
            this.displayDeleteButton(currentAdmin)
          ];
        } else {
          return [
            this.displayPromoteButton(currentAdmin),
            this.displayEditButton(currentAdmin),
            this.displayDeleteButton(currentAdmin)
          ];
        }
      }
    }
    return null;
  }
}

const mapStateToProps = ({admin}) => ({
  admin
});

AdminAction.propTypes = {
  onEdit: PropTypes.func,
  onDemote: PropTypes.func,
  onPromote: PropTypes.func,
  onDelete: PropTypes.func,
  currentAdmin: PropTypes.shape({
    Id: PropTypes.string,
    isSuperAdmin: PropTypes.bool,
    name: PropTypes.string,
    emailAddress: PropTypes.string,
    role: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, action_admin)(AdminAction);
