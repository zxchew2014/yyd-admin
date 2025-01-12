import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as auths from "../../actions/auth";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }

  onhandleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { user, logout } = this.props;

    return user !== null ? (
    //return user !== null && user.emailVerified ? (
      <div className="menu-container">
        <Menu vertical>
          <Menu.Item>
            <Menu.Header>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </Menu.Header>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>
              <Link to="/branch">Branch</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Add Branch">
                <Link to="/branch/add">Add Branch</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          {/* <Menu.Item>
            <Menu.Header>
              <Link to="/">Home</Link>
            </Menu.Header>
          </Menu.Item>*/}

          {/*<Menu.Item>
            <Menu.Header onClick={this.handleItemClick}>
              <Link to="/attendance">View Attendance</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Edit Attendance" onClick={this.handleItemClick}>
                <Link to="/attendance/edit/:id">Edit Attendance</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
           */}

          <Menu.Item>
            <Menu.Header>
              <Link to="/teacher">Teachers</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Add_Teacher">
                <Link to="/teacher/add">Add Teacher</Link>
              </Menu.Item>
              <Menu.Item name="Generate_Teacher_Attendance">
                <Link to="/teacher/attendance">Generate Attendance</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>
              <Link to="/student">Students</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Add Student">
                <Link to="/student/add">Add Student</Link>
              </Menu.Item>
              <Menu.Item name="Generate_Student_Attendance">
                <Link to="/student/attendance">Generate Attendance</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    ) : null;
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, auths)(SideMenu);
