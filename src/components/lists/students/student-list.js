import React from "react";
import { Table, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import * as STUDENTS from "../../../actions/students";
import { BATCH_1, BATCH_2, BRANCH_PUNGGOL } from "../../../utils/common";

class StudentList extends React.Component {
  componentDidMount() {
    const { branch, batch, fetchStudentsByBranch } = this.props;
    if (branch !== "") {
      fetchStudentsByBranch(branch, batch);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { branch, batch, fetchStudentsByBranch } = this.props;
    if (prevProps.branch !== branch) {
      fetchStudentsByBranch(branch, batch);
    } else if (prevProps.batch !== batch) {
      fetchStudentsByBranch(branch, batch);
    }
  }

  deleteStudent = (studentKey, branchName, batch) => {
    const { removeStudent } = this.props;
    removeStudent(studentKey, branchName, batch);
  };

  render() {
    const { branch, batch } = this.props;

    let counter = 0;

    const renderHeaderRow = branchName => (
      <Table.Row key="student-list_header">
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Primary</Table.HeaderCell>
        <Table.HeaderCell>Branch</Table.HeaderCell>
        {branchName !== "" ? (
          <Table.HeaderCell colSpan="2" textAlign="center">
            Actions
          </Table.HeaderCell>
        ) : null}
      </Table.Row>
    );

    const renderHeaderWithBatchRow = branchName => (
      <Table.Row key="student-list_header-batch">
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Primary</Table.HeaderCell>
        <Table.HeaderCell>Branch</Table.HeaderCell>
        <Table.HeaderCell>Batch</Table.HeaderCell>
        {branchName !== "" ? (
          <Table.HeaderCell colSpan="2" textAlign="center">
            Actions
          </Table.HeaderCell>
        ) : null}
      </Table.Row>
    );

    const renderStudentRows = (branchName, branchKey) =>
      Object.keys(branchName).map(studentKey => {
        const student = branchName[studentKey];
        return (
          <Table.Row key={`${branchKey}-${studentKey}`}>
            <Table.Cell>{(counter += 1)}.</Table.Cell>
            <Table.Cell>{student.Name}</Table.Cell>
            <Table.Cell>{student.Primary}</Table.Cell>
            <Table.Cell>{student.Branch}</Table.Cell>
            {branch !== ""
              ? [
                  <Table.Cell
                    key="row-student-edit"
                    selectable
                    onClick={() => this.props.onEdit(student)}
                    textAlign="center"
                  >
                    <Icon name="edit" size="large" aria-label="Edit" />
                  </Table.Cell>,
                  <Table.Cell
                    key="row-student-remove"
                    selectable
                    textAlign="center"
                    onClick={() => this.props.onDelete(student)}
                    //this.deleteStudent(student.Id, student.Branch, null)
                  >
                    <Icon name="user delete" size="large" aria-label="Remove" />
                  </Table.Cell>
                ]
              : null}
          </Table.Row>
        );
      });

    const renderStudentBatchRows = (branchName, branchKey) =>
      // eslint-disable-next-line array-callback-return,consistent-return
      Object.keys(branchName).map(studentKey => {
        const student = branchName[studentKey];
        if (student.Batch === batch) {
          // eslint-disable-next-line no-return-assign
          return (
            <Table.Row key={`${branchKey}-${studentKey}`}>
              <Table.Cell>{(counter += 1)}.</Table.Cell>
              <Table.Cell>{student.Name}</Table.Cell>
              <Table.Cell>{student.Primary}</Table.Cell>
              <Table.Cell>{student.Branch}</Table.Cell>
              <Table.Cell>{student.Batch}</Table.Cell>
              {branch !== ""
                ? [
                    <Table.Cell
                      key="row-student-batch-edit"
                      selectable
                      onClick={() => this.props.onEdit(student)}
                      textAlign="center"
                    >
                      <Icon name="edit" size="large" aria-label="Edit" />
                    </Table.Cell>,
                    <Table.Cell
                      key="row-student-batch-remove"
                      selectable
                      textAlign="center"
                      onClick={
                        () => this.props.onDelete(student)
                        //this.deleteStudent(student.Id,student.Branch,student.Batch
                      }
                    >
                      <Icon
                        name="user delete"
                        size="large"
                        aria-label="Remove"
                      />
                    </Table.Cell>
                  ]
                : null}
            </Table.Row>
          );
        }
      });

    const renderStudentsByBranch = branchName => {
      const { students } = this.props;
      return (
        <Table unstackable key="student-by-branch">
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
        <Table unstackable key="student-by-branch-batch">
          <Table.Header fullWidth>
            {renderHeaderWithBatchRow(branchName)}
          </Table.Header>
          {students !== null && (
            <Table.Body>
              {renderStudentBatchRows(students, branchName)}
            </Table.Body>
          )}
        </Table>
      );
    };

    if (branch !== "") {
      if (branch === BRANCH_PUNGGOL) {
        if (batch === "") {
          return renderStudentsByBranch(branch);
        } else if (batch === BATCH_1 || batch === BATCH_2) {
          return renderStudentsByBranchBatch(branch);
        }
      }
      return renderStudentsByBranch(branch);
    }
    return null;
  }
}

StudentList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  branch: PropTypes.string,
  batch: PropTypes.string
};

const mapStateToProps = ({ students }) => ({
  students
});

export default connect(mapStateToProps, STUDENTS)(StudentList);
