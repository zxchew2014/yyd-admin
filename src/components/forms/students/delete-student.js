import React from "react";
import { connect } from "react-redux";
import { Form, Button, Message, Table } from "semantic-ui-react";
import * as students from "../../../actions/students";
import PropTypes from "prop-types";

class RemoveStudent extends React.Component {
  constructor(props) {
    super(props);
    const { student } = this.props;
    this.state = {
      Id: student.Id,
      Name: student.Name,
      Branch: student.Branch,
      Primary: student.Primary,
      Secondary: student.Secondary,
      Foundation: student.Foundation,
      Batch: student.Batch,
      level: student.level,
      english: student.english,
      math: student.math,
      chinese: student.chinese
    };
  }

  onSubmit = event => {
    const { removeStudent, student } = this.props;
    event.preventDefault();
    if (student.Batch) {
      removeStudent(student.Id, student.Branch, student.Batch);
    } else {
      removeStudent(student.Id, student.Branch, "");
    }

    this.props.navToStudentPage();
  };

  renderRemoveForm = () => {
    const {
      Name,
      Primary,
      Branch,
      Batch,
      Foundation,
      Secondary,
      english,
      math,
      chinese,
      level
    } = this.state;
    return [
      <Message warning key="student-remove-message">
        <Message.Header>Are you sure??</Message.Header>
        <p>Student {Name || ""}'s detail will be remove once confirm below.</p>
      </Message>,

      <Table basic="very" celled collapsing key="student-remove-table">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Full Name</Table.Cell>
            <Table.Cell>{Name || ""}</Table.Cell>
          </Table.Row>

          {level === "Primary" && [
            <Table.Row>
              <Table.Cell>Primary</Table.Cell>
              <Table.Cell>{Primary || ""}</Table.Cell>
            </Table.Row>,

            Foundation && [
              <Table.Row>
                <Table.Cell>Foundation</Table.Cell>
                <Table.Cell>{Foundation || ""}</Table.Cell>
              </Table.Row>
            ]
          ]}

          {level === "Secondary" && [
            <Table.Row>
              <Table.Cell>Secondary</Table.Cell>
              <Table.Cell>{Secondary || ""}</Table.Cell>
            </Table.Row>,
            <Table.Row>
              <Table.Cell>Subjects</Table.Cell>
              <Table.Cell>
                {english && [`English ${english}`, <br />]}
                {math && [`Math ${math}`, <br />]}
                {chinese && `Chinese ${chinese}`}
              </Table.Cell>
            </Table.Row>
          ]}

          <Table.Row>
            <Table.Cell>Branch</Table.Cell>
            <Table.Cell>{Branch || ""}</Table.Cell>
          </Table.Row>

          {Batch && (
            <Table.Row>
              <Table.Cell>Batch</Table.Cell>
              <Table.Cell>{Batch}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>,

      <Form key="student-remove-form">
        <div className="ui buttons">
          <Button
            className="ui button"
            id="cancel"
            onClick={this.props.navToPreviousPage}
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
      <div className="delete-student-form">{this.renderRemoveForm()}</div>
    ];
  }
}

RemoveStudent.propTypes = {
  navToStudentPage: PropTypes.func.isRequired,
  navToPreviousPage: PropTypes.func.isRequired,
  student: PropTypes.objectOf(PropTypes.object),
  removeStudent: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches, student }) => ({ branches, student });

export default connect(mapStateToProps, students)(RemoveStudent);
