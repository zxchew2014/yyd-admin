import React from "react";
import { connect } from "react-redux";
import { Table, Icon } from "semantic-ui-react";
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
    const { branch } = this.props;
    let counter = 0;

    const renderHeaderRow = branchName => (
      <Table.Row>
        <Table.HeaderCell>S/N</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Contact No.</Table.HeaderCell>
        <Table.HeaderCell>Branch</Table.HeaderCell>
        {branch !== "" ? (
          <Table.HeaderCell colSpan="2" textAlign="center">
            Actions
          </Table.HeaderCell>
        ) : null}
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
            {this.props.branch !== ""
              ? [
                  <Table.Cell selectable
                              onClick={() => this.props.onEdit(teacher)}
                              textAlign="center">

                    <Icon name="edit" size="large" aria-label="Edit" />
                  </Table.Cell>,
                  <Table.Cell
                    selectable
                    textAlign="center"
                    onClick={() =>
                      this.removeTeacher(teacherKey, teacher.Branch)
                    }
                  >
                    <Icon name="user delete" size="large" aria-label="Remove" />
                  </Table.Cell>
                ]
              : null}
          </Table.Row>
        );
      });

    const renderAllTeacherList = () => {
      const { teachers } = this.props;

      return teachers !== null ? (
        <Table unstackable key="all-teacher">
          {Object.keys(teachers).map(branchKey => {
            const branchName = teachers[branchKey];
            counter = 0;
            return [
              <Table.Header key={branchKey} fullWidth>
                <Table.Row key={branchKey}>
                  <Table.HeaderCell colSpan="4">
                    {branchKey} - {_.size(branchName)} teachers
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
        <Table unstackable key="teacher-by-branch">
          <Table.Header fullWidth>{renderHeaderRow(branchName)}</Table.Header>
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
    onEdit: PropTypes.func.isRequired,
    branch: PropTypes.string
};

const mapStateToProps = ({ teachers }) => ({
  teachers
});

export default connect(mapStateToProps, TEACHERS)(TeacherList);
