import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import * as auths from "../../actions/auth";
import { Link } from "react-router-dom";

class TopMenu extends React.Component {
  render() {
    const { user, logout } = this.props;

    if (user !== null && user.emailVerified) {
      return (
        <div className="menu-container">
          <Menu stackable>
            <Dropdown item pointing text="Branch">
              <Dropdown.Menu>
                <Link to="/branch">
                  <Dropdown.Item>View All Branch</Dropdown.Item>
                </Link>
                <Link to="/branch/add">
                  <Dropdown.Item>Add Branch</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Teacher">
              <Dropdown.Menu>
                <Link to="/teacher">
                  <Dropdown.Item>View Teachers</Dropdown.Item>
                </Link>
                <Link to="/teacher/add">
                  <Dropdown.Item>Add Teacher</Dropdown.Item>
                </Link>
                <Link to="/teacher/attendance">
                  <Dropdown.Item>View Attendance</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Student">
              <Dropdown.Menu>
                <Link to="/student">
                  <Dropdown.Item>View Students</Dropdown.Item>
                </Link>
                <Link to="/student/add">
                  <Dropdown.Item>Add Student</Dropdown.Item>
                </Link>
                <Link to="/student/attendance">
                  <Dropdown.Item>View Attendance</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>

              <Menu.Item index="1" position="right">
                  <Link to="/" onClick={() => logout()}>
                Logout
                  </Link>
              </Menu.Item>
          </Menu>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, auths)(TopMenu);
