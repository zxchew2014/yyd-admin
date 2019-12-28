import React from "react";
import { connect } from "react-redux";
import { Form, Button, Message, Table } from "semantic-ui-react";
import * as teachers from "../../../actions/teachers";
import PropTypes from "prop-types";

class RemoveTeacher extends React.Component {
  constructor(props) {
    super(props);
    const { teacher } = this.props;
    this.state = {
      Id: teacher.Id,
      Name: teacher.Name,
      Branch: teacher.Branch,
      Mobile: teacher.Mobile
    };
  }

  onSubmit = event => {
    const { removeTeacher, teacher } = this.props;
    event.preventDefault();
    removeTeacher(teacher);
    this.props.navToTeacherPage();
  };

  renderRemoveForm = () => {
    const { Name, Branch, Mobile } = this.state;
    return [
      <Message warning key="teacher-remove-message">
        <Message.Header>Are you sure??</Message.Header>
        <p>Teacher {Name || ""}'s detail will be remove once confirm below.</p>
      </Message>,

      <Table basic="very" celled collapsing key="teacher-remove-table">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Full Name</Table.Cell>
            <Table.Cell>{Name || ""}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Contact Number</Table.Cell>
            <Table.Cell>{Mobile || ""}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Branch</Table.Cell>
            <Table.Cell>{Branch || ""}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,

      <Form key="teacher-remove-form">
        <div className="ui buttons">
          <Button
            className="ui button"
            id="cancel"
            onClick={this.props.navToTeacherPage}
          >
            Cancel
          </Button>
          <div className="or" />
          <Button
            className="ui negative button"
            type="submit"
            onClick={this.onSubmit}
          >
            Remove
          </Button>
        </div>
      </Form>
    ];
  };

  render() {
    return [
      <div className="delete-teacher-form">{this.renderRemoveForm()}</div>
    ];
  }
}

RemoveTeacher.propTypes = {
  navToTeacherPage: PropTypes.func.isRequired,
  teacher: PropTypes.objectOf(PropTypes.object),
  removeTeacher: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches, teacher }) => ({ branches, teacher });

export default connect(mapStateToProps, teachers)(RemoveTeacher);
