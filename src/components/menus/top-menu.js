import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import * as auths from "../../actions/auth";
import { Link } from "react-router-dom";
import { fetchAdmin } from "../../actions/admins";

class TopMenu extends React.Component {
  render() {
    const { user, logout, admin } = this.props;
    fetchAdmin(user);

    if (user !== null && user.emailVerified) {
      return (
        <div className="menu-container">
          <Menu stackable>
            {admin !== null && admin.isSuperAdmin
              ? [
                  <Dropdown item pointing text="Admin" key="admin">
                    <Dropdown.Menu>
                      <Link to="/admin">
                        <Dropdown.Item>View All Admin</Dropdown.Item>
                      </Link>
                      <Link to="/admin/add">
                        <Dropdown.Item>Add Admin</Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>,
                  <Dropdown item pointing text="Branch" key="branch">
                    <Dropdown.Menu>
                      <Link to="/branch">
                        <Dropdown.Item>View All Branch</Dropdown.Item>
                      </Link>
                      <Link to="/branch/add">
                        <Dropdown.Item>Add Branch</Dropdown.Item>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>,
                  <Dropdown item text="Teacher" key="teacher">
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
                ]
              : null}

            <Dropdown item text="Student" key="student">
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

            <Menu.Item index={1} position="right">
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

const mapStateToProps = ({ user, admin }) => ({
  user,
  admin
});

export default connect(mapStateToProps, auths)(TopMenu);
