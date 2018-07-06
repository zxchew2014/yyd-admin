import React from 'react';
import { Menu } from 'semantic-ui-react';
import * as auths from '../../actions/auth';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderLoginButton() {
    return (
      <Menu.Menu position="right">
        <Menu.Item name="login" active="login" />
      </Menu.Menu>
    );
  }
  renderUserData() {
    const { logout, user } = this.props;
    return (
      <Menu.Menu position="right">
        {user.email ? (
          <Menu.Item name={user.email} />
        ) : (
          <Menu.Item name={user.email} />
        )}

        <Menu.Item
          name="logout"
          active="logout"
          onClick={() => {
            logout();
          }}
        />
      </Menu.Menu>
    );
  }
  render() {
    const { user } = this.props;
    return (
      <Menu pointing secondary>
        {JSON.stringify(user) === JSON.stringify({})
          ? this.renderLoginButton()
          : this.renderUserData()}
      </Menu>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}
export default connect(mapStateToProps, auths)(Header);
