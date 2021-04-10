import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as action_admin from "../../../actions/admins";
import { Button, Icon, Table, Label } from "semantic-ui-react";
import AdminAction from "../../actions/admins/admin-action";

class AdminList extends React.Component {
  UNSAFE_componentWillMount() {
    const { fetchAdminList } = this.props;
    fetchAdminList();
  }

  render() {
    const { admins } = this.props;

    const renderAdminUserRow = () => {
      if (admins === null) return null;

      return Object.keys(admins).map(key => {
        const adminObj = admins[key];
        const emailAddress = adminObj.emailAddress;
        const superAdmin = adminObj.isSuperAdmin;
        const role = adminObj.role;

        return (
          <Table.Row key={key}>
            <Table.Cell>
              {superAdmin ? (
                <Icon name="star" size="small" color="yellow" />
              ) : null}
              {adminObj.name}{" "}
              {superAdmin ? (
                <Label basic color="blue" size="mini" circular>
                  {role}
                </Label>
              ) : (
                <Label basic color="grey" size="mini" circular>
                  {role}
                </Label>
              )}
            </Table.Cell>
            <Table.Cell>{emailAddress}</Table.Cell>
            <Table.Cell textAlign="right">
              <AdminAction
                onDemote={this.props.onDemote}
                onPromote={this.props.onPromote}
                onDelete={this.props.onDelete}
                onEdit={this.props.onEdit}
                currentAdmin={adminObj}
              />
            </Table.Cell>
          </Table.Row>
        );
      });
    };

    return (
      <div className="admin-list-container">
        <Table striped unstackable>
          <Table.Header>
            <Table.Row>
              {admins
                ? [
                    <Table.HeaderCell key="header-name">Name</Table.HeaderCell>,
                    <Table.HeaderCell key="header-email">
                      Email
                    </Table.HeaderCell>
                  ]
                : null}

              <Table.HeaderCell textAlign="right">
                <Button
                  icon
                  labelPosition="left"
                  size="small"
                  color="green"
                  onClick={() => this.props.onCreate()}
                >
                  <Icon name="plus" /> Add Admin
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderAdminUserRow()}</Table.Body>
        </Table>
        <br />
      </div>
    );
  }
}

const mapStateToProps = ({ admins, admin }) => ({
  admins,
  admin
});

AdminList.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onDemote: PropTypes.func,
  onPromote: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};
export default connect(mapStateToProps, action_admin)(AdminList);
