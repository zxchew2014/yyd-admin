import React from "react";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as auths from "../../actions/auth";
import { VERSION_DATE, VERSION_NO } from "../../utils/common";
import NewsUpdatePopup from "../pages/newsUpdateItems";

class Header extends React.Component {
  renderLoginButton = () => [
    <Menu.Menu position="left" key={"menu-login-left"}>
      <Menu.Item active>
        <NewsUpdatePopup />
      </Menu.Item>
      <Menu.Item name="version" active>
        Updated since {VERSION_DATE} {VERSION_NO}
      </Menu.Item>
    </Menu.Menu>,
    <Menu.Menu position="right" key={"menu-login-right"}>
      <Menu.Item name="login" active>
        <Link to="/">Click to Login</Link>
      </Menu.Item>
    </Menu.Menu>
  ];

  renderUserData = (logout, user) => [
    <Menu.Menu position="left" key={"menu-user-left"}>
      <Menu.Item active>
        <NewsUpdatePopup />
      </Menu.Item>
      <Menu.Item name="version" active>
        Updated since {VERSION_DATE} {VERSION_NO}
      </Menu.Item>
    </Menu.Menu>,
    <Menu.Menu position="right" key={"menu-user-right"}>
      {user !== null ? <Menu.Item name={user.displayName} /> : null}

      <Menu.Item
        name="logout"
        active
        onClick={() => {
          logout();
        }}
      />
    </Menu.Menu>
  ];

  render() {
    const { logout, user } = this.props;
    return (
      <Menu pointing secondary key={"main-menu"}>
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
