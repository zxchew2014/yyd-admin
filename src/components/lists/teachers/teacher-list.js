import React from "react";
import { connect } from "react-redux";
import { Table, Icon, Button } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";
import * as TEACHERS from "../../../actions/teachers";

class TeacherList extends React.Component {
  componentDidMount() {
    const { branch, fetchAllTeachers, fetchTeachersByBranch } = this.props;

    if (branch === "") {
      fetchAllTeachers();
    } else {
      fetchTeachersByBranch(branch);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { branch, fetchTeachersByBranch } = this.props;
    if (prevProps.branch !== branch) {
      fetchTeachersByBranch(branch);
    }
  }

  removeTeacher = (teacher, branchName) => {
    const { removeTeacher } = this.props;
    removeTeacher(teacher, branchName);
  };

  render() {
    const { branch, btnDisable = false } = this.props;
    let counter = 0;

    const renderHeaderRow = () => (
      <Table.Row>
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Contact No.</Table.HeaderCell>
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
              <Icon name="add user" /> Add Teacher
            </Button>
          </Table.HeaderCell>
        )}
      </Table.Row>
    );

    const renderTeacherRows = (branchName, branchKey) =>
      Object.keys(branchName).map(teacherKey => {
        const teacher = branchName[teacherKey];
        return (
          <Table.Row key={`${branchKey}-${teacherKey}`}>
            <Table.Cell>{(counter += 1)}.</Table.Cell>
            <Table.Cell>{teacher.Name}</Table.Cell>
            <Table.Cell>{teacher.Mobile}</Table.Cell>
            <Table.Cell>{teacher.Branch}</Table.Cell>
            {btnDisable ? null : (
              <Table.Cell textAlign="right">
                <Button
                  icon
                  labelPosition="left"
                  size="small"
                  color="green"
                  onClick={() => this.props.onEdit(teacher)}
                >
                  <Icon name="edit" /> Edit Teacher
                </Button>
                <Button
                  icon
                  labelPosition="left"
                  size="small"
                  color="red"
                  onClick={() => this.props.onDelete(teacher)}
                >
                  <Icon name="user delete" /> Remove Teacher
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        );
      });

    const renderAllTeacherList = () => {
      const { teachers } = this.props;

      return teachers !== null ? (
        <Table basic="very" striped stackable key="all-teacher">
          {Object.keys(teachers).map(branchKey => {
            const branchName = teachers[branchKey];
            counter = 0;
            const noOfTeacher = _.size(branchName);

            return [
              <Table.Header key={branchKey} fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    {branchKey} - {noOfTeacher}{" "}
                    {noOfTeacher <= 1 ? "teacher" : "teachers"}
                  </Table.HeaderCell>
                </Table.Row>
                {renderHeaderRow()}
              </Table.Header>,
              <Table.Body>
                {renderTeacherRows(branchName, branchKey)}
              </Table.Body>
            ];
          })}
        </Table>
      ) : null;
    };

    const renderTeachersByBranch = branchName => {
      const { teachers } = this.props;
      return (
        <Table basic="very" striped stackable key="teacher-by-branch">
          <Table.Header fullWidth>{renderHeaderRow()}</Table.Header>
          {teachers !== null ? (
            <Table.Body>{renderTeacherRows(teachers, branchName)}</Table.Body>
          ) : null}
        </Table>
      );
    };

    return branch === ""
      ? renderAllTeacherList()
      : renderTeachersByBranch(branch);
  }
}

TeacherList.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onCreate: PropTypes.func,
  branch: PropTypes.string,
  btnDisable: PropTypes.bool
};

const mapStateToProps = ({ teachers }) => ({
  teachers
});

export default connect(mapStateToProps, TEACHERS)(TeacherList);
