import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as auths from "../../actions/auth";
import { VERSION_DATE, VERSION_NO } from "../../utils/common";

class Header extends React.Component {
  renderLoginButton = () => [
    <Menu.Menu position="left">
      <Menu.Item name="version" active="version">
        Updated since {VERSION_DATE} {VERSION_NO}
      </Menu.Item>
    </Menu.Menu>,
    <Menu.Menu position="right">
      <Menu.Item name="login" active="login">
        <Link to="/">Click to Login</Link>
      </Menu.Item>
    </Menu.Menu>
  ];

  renderUserData = (logout, user) => [
    <Menu.Menu position="left">
      <Menu.Item name="version" active="version">
        Updated since {VERSION_DATE} {VERSION_NO}
      </Menu.Item>
    </Menu.Menu>,
    <Menu.Menu position="right">
      {user !== null ? <Menu.Item name={user.displayName} /> : null}

      <Menu.Item
        name="logout"
        active="logout"
        onClick={() => {
          logout();
        }}
      />
    </Menu.Menu>
  ];

  render() {
    const { logout, user } = this.props;
    return (
      <Menu pointing secondary>
        {user === null
          ? this.renderLoginButton()
          : this.renderUserData(logout, user)}
      </Menu>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, auths)(Header);
