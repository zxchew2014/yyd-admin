import React from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as STUDENTS from "../../../actions/students";
import { BATCH_1, BATCH_2 } from "../../../utils/common";
import StudentSubjectList from "../subjectList";

class StudentList extends React.Component {
  componentDidMount() {
    const { branch, batch, level, fetchStudentsByBranch } = this.props;
    if (branch !== "") {
      fetchStudentsByBranch(branch, batch, level);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { branch, batch, level, fetchStudentsByBranch } = this.props;
    if (
      prevProps.branch !== branch ||
      prevProps.batch !== batch ||
      prevProps.level !== level
    ) {
      if (branch !== "") {
        fetchStudentsByBranch(branch, batch, level);
      }
    }
  }

  render() {
    const { branch, batch, level, btnDisable = false } = this.props;
    let counter = 0;

    const renderHeaderRow = () => (
      <Table.Row key="student-list_header-all">
        <Table.HeaderCell textAlign="center">S/N</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
        {level === "Primary" && [
          <Table.HeaderCell textAlign="center">Primary</Table.HeaderCell>,
          <Table.HeaderCell textAlign="center">Foundation</Table.HeaderCell>
        ]}
        {level === "Secondary" && [
          <Table.HeaderCell textAlign="center">Secondary</Table.HeaderCell>,
          <Table.HeaderCell textAlign="center">Subject</Table.HeaderCell>
        ]}
        <Table.HeaderCell textAlign="center">Branch</Table.HeaderCell>
        {batch && <Table.HeaderCell>Batch</Table.HeaderCell>}
        {btnDisable ? null : (
          <Table.HeaderCell textAlign="right">
            <Button
              fluid
              icon="add user"
              labelPosition="left"
              size="small"
              color="green"
              content="Add Student / Alumni"
              onClick={() => this.props.onCreate()}
            />
          </Table.HeaderCell>
        )}
      </Table.Row>
    );

    const renderStudentRows = (branchName, branchKey) =>
      Object.keys(branchName).map(studentKey => {
        const student = branchName[studentKey];
        return renderStudentRow(student, branchKey, studentKey);
      });

    const renderStudentBatchRows = (branchName, branchKey) =>
      Object.keys(branchName).map(studentKey => {
        const student = branchName[studentKey];
        if (student.Batch === batch) {
          return renderStudentRow(student, branchKey, studentKey);
        }
      });

    const renderStudentRow = (student, branchKey, studentKey) => {
      return (
        <Table.Row key={`${branchKey}-${studentKey}`}>
          <Table.Cell textAlign="center">{(counter += 1)}.</Table.Cell>
          <Table.Cell textAlign="left">{student.Name}</Table.Cell>
          {level === "Primary" && [
            <Table.Cell textAlign="center">
              Primary {student.Primary}
            </Table.Cell>,
            <Table.Cell textAlign="center">{student.Foundation}</Table.Cell>
          ]}
          {level === "Secondary" && [
            <Table.Cell textAlign="center">
              Secondary {student.Secondary}
            </Table.Cell>,
            <Table.Cell textAlign="center">
              <StudentSubjectList student={student}/>
            </Table.Cell>
          ]}
          <Table.Cell textAlign="center">{student.Branch}</Table.Cell>
          {batch && <Table.Cell textAlign="center">{student.Batch}</Table.Cell>}
          {btnDisable ? null : (
            <Table.Cell textAlign="right">
              <Button.Group fluid>
                <Button
                  icon="edit"
                  labelPosition="left"
                  size="small"
                  color="green"
                  content="Edit"
                  onClick={() => this.props.onEdit(student)}
                />
                <Button.Or />
                <Button
                  icon="user delete"
                  labelPosition="right"
                  size="small"
                  color="red"
                  content="Remove"
                  onClick={() => this.props.onDelete(student)}
                />
              </Button.Group>
            </Table.Cell>
          )}
        </Table.Row>
      );
    };

    const renderStudentsByBranch = branchName => {
      const { students } = this.props;
      return (
        <Table striped celled stackable key="student-by-branch">
          <Table.Header fullWidth>{renderHeaderRow(branchName)}</Table.Header>
          {students !== null && (
            <Table.Body>{renderStudentRows(students, branchName)}</Table.Body>
          )}
        </Table>
      );
    };

    const renderStudentsByBranchBatch = branchName => {
      const { students } = this.props;
      return (
        <Table striped celled stackable key="student-by-branch-batch">
          <Table.Header fullWidth>{renderHeaderRow()}</Table.Header>
          {students !== null && (
            <Table.Body>
              {renderStudentBatchRows(students, branchName)}
            </Table.Body>
          )}
        </Table>
      );
    };

    if (branch !== "") {
      if (batch === "") {
        return renderStudentsByBranch(branch);
      } else if (batch === BATCH_1 || batch === BATCH_2) {
        return renderStudentsByBranchBatch(branch);
      }
    }

    return [
      <br />,
      <Button
        fluid
        floated="right"
        icon="add user"
        labelPosition="left"
        size="small"
        color="green"
        content="Add Student / Alumni"
        onClick={() => this.props.onCreate()}
      />
    ];
  }
}

StudentList.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onCreate: PropTypes.func,
  branch: PropTypes.string,
  batch: PropTypes.string,
  level: PropTypes.string,
  btnDisable: PropTypes.bool
};

const mapStateToProps = ({ students }) => ({
  students
});

export default connect(mapStateToProps, STUDENTS)(StudentList);
