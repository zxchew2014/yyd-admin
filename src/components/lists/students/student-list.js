import React from "react";
// import { Icon, Table } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import * as STUDENTS from "../../../actions/students";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    const { branch } = this.props;
    this.state = {
      branch: branch || "",
      loading: true
    };
  }

  componentDidMount() {
    const { branch, fetchStudentsByBranch } = this.props;
    if (branch.trim())
      fetchStudentsByBranch(branch).then(this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { branch, fetchStudentsByBranch } = this.props;
    if (prevProps.branch !== branch) {
      fetchStudentsByBranch(branch).then(this.setState({ loading: false }));
    }
  }

  render() {
    const { branch } = this.props;
    // let counter = 0;

    const renderHeaderRow = () => (
      <Table.Row>
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Branch</Table.HeaderCell>
        {branch !== "" ? (
          <Table.HeaderCell colSpan="2" textAlign="center">
            Actions
          </Table.HeaderCell>
        ) : null}
      </Table.Row>
    );

    /* const renderStudentRows = (branch, branchKey) =>
          Object.keys(branch).map(teacherKey => {
            const teacher = branch[teacherKey];
            return (
              <Table.Row key={`${branchKey}-${teacherKey}`}>
                <Table.Cell>{counter+=1}.</Table.Cell>
                <Table.Cell>{teacher.Name}</Table.Cell>
                <Table.Cell>{branchKey}</Table.Cell>
                {this.props.branch !== ""
                  ? [
                      <Table.Cell selectable textAlign="center">
                        <Icon name="edit" size="large" aria-label="Edit" />
                      </Table.Cell>,
                      <Table.Cell
                        selectable
                        textAlign="center"
                        onClick={() => this.removeTeacher(teacherKey, branchKey)}
                      >
                        <Icon name="user delete" size="large" aria-label="Remove" />
                      </Table.Cell>
                    ]
                  : null}
              </Table.Row>
            );
          }); */

    const renderStudentsByBranch = branch => {
      // const { students } = this.props;
      return (
        <Table unstackable key="student-by-branch">
          <Table.Header fullWidth>{renderHeaderRow()}</Table.Header>
          {/*  <Table.Body>{renderStudentRows(students, branch)}</Table.Body> */}
        </Table>
      );
    };

    return branch === "" ? null : renderStudentsByBranch(branch);
  }
}

StudentList.propTypes = {
  branch: PropTypes.string
};

const mapStateToProps = ({ students }) => ({
  students
});

export default connect(
  mapStateToProps,
  STUDENTS
)(StudentList);
