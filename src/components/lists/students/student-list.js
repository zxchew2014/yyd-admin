import React from "react";
import { Table, Icon, Button } from "semantic-ui-react";
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

  render() {
    const { branch, batch, btnDisable = false } = this.props;

    let counter = 0;

    const renderHeaderRow = () => (
      <Table.Row key="student-list_header">
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Primary</Table.HeaderCell>
        <Table.HeaderCell>Branch</Table.HeaderCell>
        {btnDisable ? null : (
          <Table.HeaderCell textAlign="right">
            <Button
              icon
              labelPosition="left"
              size="small"
              color="green"
              onClick={() => this.props.onCreate()}
            >
              <Icon name="add user" /> Add Student
            </Button>
          </Table.HeaderCell>
        )}
      </Table.Row>
    );

    const renderHeaderWithBatchRow = () => (
      <Table.Row key="student-list_header-batch">
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Primary</Table.HeaderCell>
        <Table.HeaderCell>Branch</Table.HeaderCell>
        <Table.HeaderCell>Batch</Table.HeaderCell>
        {btnDisable ? null : (
          <Table.HeaderCell textAlign="right">
            <Button
              icon
              labelPosition="left"
              size="small"
              color="green"
              onClick={() => this.props.onCreate()}
            >
              <Icon name="add user" /> Add Student
            </Button>
          </Table.HeaderCell>
        )}
      </Table.Row>
    );

    const renderStudentRows = (branchName, branchKey) =>
      Object.keys(branchName).map(studentKey => {
        const student = branchName[studentKey];
        return (
          <Table.Row key={`${branchKey}-${studentKey}`}>
            <Table.Cell>{(counter += 1)}.</Table.Cell>
            <Table.Cell>{student.Name}</Table.Cell>
            <Table.Cell>Primary {student.Primary}</Table.Cell>
            <Table.Cell>{student.Branch}</Table.Cell>
            {btnDisable ? null : (
              <Table.Cell textAlign="right">
                <Button
                  icon
                  labelPosition="left"
                  size="small"
                  color="green"
                  onClick={() => this.props.onEdit(student)}
                >
                  <Icon name="edit" /> Edit Student
                </Button>
                <Button
                  icon
                  labelPosition="left"
                  size="small"
                  color="red"
                  onClick={() => this.props.onDelete(student)}
                >
                  <Icon name="user delete" /> Remove Student
                </Button>
              </Table.Cell>
            )}
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
              <Table.Cell>Primary {student.Primary}</Table.Cell>
              <Table.Cell>{student.Branch}</Table.Cell>
              <Table.Cell>{student.Batch}</Table.Cell>
              {btnDisable ? null : (
                <Table.Cell textAlign="right">
                  <Button
                    icon
                    labelPosition="left"
                    size="small"
                    color="green"
                    onClick={() => this.props.onEdit(student)}
                  >
                    <Icon name="edit" /> Edit Student
                  </Button>
                  <Button
                    icon
                    labelPosition="left"
                    size="small"
                    color="red"
                    onClick={() => this.props.onDelete(student)}
                  >
                    <Icon name="user delete" /> Remove Student
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          );
        }
      });

    const renderStudentsByBranch = branchName => {
      const { students } = this.props;
      return (
        <Table basic="very" striped stackable key="student-by-branch">
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
        <Table basic="very" striped stackable key="student-by-branch-batch">
          <Table.Header fullWidth>{renderHeaderWithBatchRow()}</Table.Header>
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

    return [
      <br />,
      <Button
        floated="right"
        icon
        labelPosition="left"
        size="small"
        color="green"
        onClick={() => this.props.onCreate()}
      >
        <Icon name="add user" /> Add Student
      </Button>
    ];
  }
}

StudentList.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onCreate: PropTypes.func,
  branch: PropTypes.string,
  batch: PropTypes.string,
  btnDisable: PropTypes.bool
};

const mapStateToProps = ({ students }) => ({
  students
});

export default connect(mapStateToProps, STUDENTS)(StudentList);
