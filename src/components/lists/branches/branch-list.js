import React from "react";
import { connect } from "react-redux";
import * as BRANCHES from "../../../actions/branches";
import { Button, Icon, Label, List, Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import ItemIcon from "../../items/itemIcon";
import ItemList from "../../items/itemList";

class BranchList extends React.Component {
  UNSAFE_componentWillMount() {
    const { fetchBranchLists } = this.props;
    fetchBranchLists();
  }

  render() {
    const renderBranchRow = () => {
      const { branches } = this.props;

      if (branches === null) return null;

      return Object.keys(branches).map(key => {
        const branch = branches[key];
        const active = branch.Active;

        return (
          <Table.Row key={key}>
            <Table.Cell>
              {branch.Branch_Name} {"  "}
              {active ? (
                <Label basic color="green" size="mini" circular>
                  Active
                </Label>
              ) : (
                <Label basic color="orange" size="mini" circular>
                  Not Active
                </Label>
              )}
            </Table.Cell>
            <Table.Cell>
              <List>
                <ItemList value={branch.primary} description="Primary" />
                <ItemList value={branch.secondary} description="Secondary" />
              </List>
            </Table.Cell>
            <Table.Cell>SGD $ {branch.teacher_payout || "0.00"}</Table.Cell>
            <Table.Cell>
              SGD $ {branch.parent_volunteer_payout || "0.00"}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button.Group fluid>
                <Button
                  icon="edit"
                  size="small"
                  color="green"
                  content="Edit"
                  onClick={() => this.props.onEdit(branch)}
                />
                <Button.Or />
                {active ? (
                  <Button
                    key="btn-set-not-active"
                    icon="unlink"
                    size="small"
                    color="orange"
                    content="Set to Not Active"
                    onClick={() => this.props.onSetNotActive(branch)}
                  />
                ) : (
                  [
                    <Button
                      key="btn-set-active"
                      icon="linkify"
                      size="small"
                      color="teal"
                      content="Set to Active"
                      onClick={() => this.props.onSetActive(branch)}
                    />,
                    <Button.Or />,
                    <Button
                      key="btn-set-delete"
                      icon="trash"
                      size="small"
                      color="red"
                      content="Remove"
                      onClick={() => this.props.onDelete(branch)}
                    />
                  ]
                )}
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        );
      });
    };

    return (
      <div className="branch-list-container">
        <Table basic="very" striped celled stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Branch Name</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Teacher Payout</Table.HeaderCell>
              <Table.HeaderCell>Parent Volunteer Payout</Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  fluid
                  floated="right"
                  icon="plus"
                  labelPosition="left"
                  size="small"
                  color="green"
                  content="Add Branch"
                  onClick={this.props.onCreate}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderBranchRow()}</Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ branches }) => ({
  branches
});

BranchList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onSetActive: PropTypes.func.isRequired,
  onSetNotActive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default connect(mapStateToProps, BRANCHES)(BranchList);
