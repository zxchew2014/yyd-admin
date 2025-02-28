import React from "react";
import { connect } from "react-redux";
import { Table, Button } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";
import * as TEACHERS from "../../../actions/teachers";
import GenerateHeaderCellList from "../table/headerCellList";

class TeacherList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      branch,
      level,
      fetchAllTeachers,
      fetchTeachersByBranch
    } = this.props;

    if (branch === "") {
      fetchAllTeachers(level);
    } else {
      fetchTeachersByBranch(branch, level);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      branch,
      level,
      fetchTeachersByBranch,
      fetchAllTeachers
    } = this.props;
    if (prevProps.level !== level) {
      fetchAllTeachers(level);
    }

    if (prevProps.branch !== branch) {
      if (branch === "") fetchAllTeachers(level);
      else fetchTeachersByBranch(branch, level);
    }
  }

  removeTeacher = (teacher, branchName) => {
    const { removeTeacher } = this.props;
    removeTeacher(teacher, branchName);
  };

  render() {
    const { branch, btnDisable = false } = this.props;
    let counter = 0;
    const headerTextList = ["S/N", "Name", "Contact No.", "Branch"];

    const renderHeaderRow = () => (
      <Table.Row key="headerRow">
        <GenerateHeaderCellList headerList={headerTextList} />
        {btnDisable ? null : (
          <Table.HeaderCell textAlign="right">
            <Button
              fluid
              icon="add user"
              labelPosition="left"
              size="small"
              color="green"
              content="Add Teacher"
              onClick={() => this.props.onCreate()}
            />
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
                <Button.Group fluid>
                  <Button
                    icon="edit"
                    labelPosition="left"
                    size="small"
                    color="green"
                    content="Edit"
                    onClick={() => this.props.onEdit(teacher)}
                  />
                  <Button.Or />
                  <Button
                    icon="user delete"
                    labelPosition="right"
                    size="small"
                    color="red"
                    content="Remove"
                    onClick={() => this.props.onDelete(teacher)}
                  />
                </Button.Group>
              </Table.Cell>
            )}
          </Table.Row>
        );
      });

    const renderAllTeacherList = () => {
      const { teachers } = this.props;

      return (
        teachers !== null && (
          <Table striped stackable key="all-teacher">
            {Object.keys(teachers).map(branchKey => {
              const branchName = teachers[branchKey];
              counter = 0;
              const noOfTeacher = _.size(branchName);

              return (
                <React.Fragment key={branchKey}>
                  <Table.Header fullWidth>
                    <Table.Row>
                      <Table.HeaderCell colSpan="6">
                        {branchKey} - {noOfTeacher}{" "}
                        {noOfTeacher <= 1 ? "teacher" : "teachers"}
                      </Table.HeaderCell>
                    </Table.Row>
                    {renderHeaderRow()}
                  </Table.Header>
                  <Table.Body>
                    {renderTeacherRows(branchName, branchKey)}
                  </Table.Body>
                </React.Fragment>
              );
            })}
          </Table>
        )
      );
    };

    const renderTeachersByBranch = branchName => {
      const { teachers } = this.props;
      return (
        <Table striped stackable key="teacher-by-branch">
          <Table.Header fullWidth>{renderHeaderRow()}</Table.Header>
          {teachers !== null && (
            <Table.Body>{renderTeacherRows(teachers, branchName)}</Table.Body>
          )}
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
  level: PropTypes.string,
  btnDisable: PropTypes.bool
};

const mapStateToProps = ({ teachers }) => ({
  teachers
});

export default connect(mapStateToProps, TEACHERS)(TeacherList);
