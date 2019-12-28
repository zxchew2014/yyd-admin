import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import { Button, Form, Message, Table } from "semantic-ui-react";

class UpdateBranch extends React.Component {
  constructor(props) {
    super(props);
    const { branch } = this.props;
    this.state = {
      Id: branch.Id,
      Branch_Name: branch.Branch_Name,
      Active: branch.Active
    };
  }

  onSubmit = event => {
    const { updateBranch, branch } = this.props;
    event.preventDefault();
    branch.Active = false;
    updateBranch(branch);
    this.props.navToBranchPage();
  };

  renderNotActiveForm = () => {
    const { Branch_Name } = this.state;
    return [
      <Message warning key="branch-remove-message">
        <Message.Header>Are you sure??</Message.Header>
        <p>
          Branch {Branch_Name || ""} will set to "Not Active" once confirm
          below.
        </p>
        <p>
          Student Details from Branch {Branch_Name || ""} will be remove from
          the system
        </p>
        <p>
          Teacher Details from Branch {Branch_Name || ""} will be remove from
          the system
        </p>
        <p>
          Attendance Details from Branch {Branch_Name || ""} will not be remove
          the system
        </p>
      </Message>,

      <Table basic="very" celled collapsing key="branch-remove-table">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Branch Name</Table.Cell>
            <Table.Cell>{Branch_Name || ""}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,

      <Form key="teacher-remove-form">
        <div className="ui buttons">
          <Button
            className="ui button"
            id="cancel"
            onClick={this.props.navToBranchPage}
          >
            Cancel
          </Button>
          <div className="or" />
          <Button
            className="ui negative button"
            type="submit"
            onClick={this.onSubmit}
          >
            Confirm to Remove
          </Button>
        </div>
      </Form>
    ];
  };

  render() {
    return [
      <div className="update-branch-form">{this.renderNotActiveForm()}</div>
    ];
  }
}

UpdateBranch.propTypes = {
  navToBranchPage: PropTypes.func.isRequired,
  updateBranch: PropTypes.func
};

const mapStateToProps = ({ branch }) => ({ branch });

export default connect(mapStateToProps, branches)(UpdateBranch);
