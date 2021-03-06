import React from "react";
import { connect } from "react-redux";
import * as BRANCHES from "../../../actions/branches";
import { Button, Icon, Label, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

class BranchList extends React.Component {
  UNSAFE_componentWillMount() {
    const { fetchBranchList } = this.props;
    fetchBranchList();
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
            <Table.Cell textAlign="right">
              {active ? (
                <Button
                  key="btn-set-not-active"
                  icon
                  labelPosition="left"
                  size="small"
                  color="red"
                  onClick={() => this.props.onSetNotActive(branch)}
                >
                  <Icon name="unlink" />
                  Set to Not Active
                </Button>
              ) : (
                [
                  <Button
                    key="btn-set-active"
                    icon
                    labelPosition="left"
                    size="small"
                    color="green"
                    onClick={() => this.props.onSetActive(branch)}
                  >
                    <Icon name="linkify" /> Set to Active
                  </Button>,
                  <Button
                    key="btn-set-delete"
                    icon
                    labelPosition="left"
                    size="small"
                    color="red"
                    onClick={() => this.props.onDelete(branch)}
                  >
                    <Icon name="trash" />
                    Remove Branch
                  </Button>
                ]
              )}
            </Table.Cell>
          </Table.Row>
        );
      });
    };

    return (
      <div className="branch-list-container">
        <Table basic="very" striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Branch Name</Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  size="small"
                  color="green"
                  onClick={this.props.onCreate}
                >
                  <Icon name="plus" /> Add Branch
                </Button>
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
  onCreate: PropTypes.func.isRequired,
  onSetActive: PropTypes.func.isRequired,
  onSetNotActive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default connect(mapStateToProps, BRANCHES)(BranchList);
