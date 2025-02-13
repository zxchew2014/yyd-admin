import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Header, Icon, Message, Table } from "semantic-ui-react";
import StudentList from "../../lists/students/student-list";
import TeacherList from "../../lists/teachers/teacher-list";

class UpdateBranch extends React.Component {
  constructor(props) {
    super(props);
    const { branch } = this.props;
    this.state = {
      ...branch
    };
  }

  renderNotActiveForm = () => {
    const { branch } = this.props;
    const { Branch_Name, branch_code, primary, secondary} = this.state;

    return [
      <Message error key="branch-remove-message">
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

      <Header as="h3" key="branch-header">
        <Icon name="home" />
        <Header.Content>Branch Detail</Header.Content>
      </Header>,

      <Table basic="very" celled stackable key="branch-remove-table">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>Branch Name</Table.HeaderCell>
            <Table.Cell>{Branch_Name || ""}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Branch Code</Table.HeaderCell>
            <Table.Cell>{branch_code || ""}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,

      <Header as="h3" key="students-header">
        <Icon name="users" />
        <Header.Content>Student List</Header.Content>
      </Header>,
      <StudentList key="student-list" branch={Branch_Name} btnDisable={true} spiltLevel={true} branchHasPrimary={primary} branchHasSecondary={secondary} />,
      <Header as="h3" key="teachers-header">
        <Icon name="users" />
        <Header.Content>Teacher List</Header.Content>
      </Header>,
      <TeacherList key="teacher-list" branch={Branch_Name} btnDisable={true} />,

      <div className="ui buttons">
        <Button
          className="ui button"
          id="cancel"
          onClick={() => this.props.onBack()}
        >
          Cancel
        </Button>
        <div className="or" />
        <Button
          className="ui negative button"
          onClick={() => this.props.onSubmit(branch)}
        >
          Confirm
        </Button>
      </div>
    ];
  };

  render() {
    return [
      <div className="update-branch-form">{this.renderNotActiveForm()}</div>
    ];
  }
}

UpdateBranch.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ branch }) => ({ branch });

export default connect(mapStateToProps, {})(UpdateBranch);
