import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    };
  }

  onhandleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state || {};

    return (
      <div className="menu-container">
        <Menu vertical>
          <Menu.Item>
            <Menu.Header>
              <Link to="/">Home</Link>
            </Menu.Header>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header onClick={this.handleItemClick}>
              <Link to="/attendance">View Attendance</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Edit Attendance" onClick={this.handleItemClick}>
                <Link to="/attendance/edit/:id">Edit Attendance</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header onClick={this.handleItemClick}>
              <Link to="/teacher">View All Teachers</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Add Teacher" onClick={this.handleItemClick}>
                <Link to="/teacher/add">Add Teacher</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header onClick={this.handleItemClick}>
              <Link to="/student">View All Students</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Add Student" onClick={this.handleItemClick}>
                <Link to="/student/add">Add Student</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header onClick={this.handleItemClick}>
              <Link to="/student">View All Branches</Link>
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item name="Add Branch" onClick={this.handleItemClick}>
                <Link to="/branch/add">Add Branch</Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>
              <Link to="/">Logout</Link>
            </Menu.Header>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps, {})(SideMenu);
