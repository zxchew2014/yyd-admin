import React from "react";
import {Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import * as auths from "../../actions/auth";

class Header extends React.Component {
    renderLoginButton = () => (
        <Menu.Menu position="right">
            <Menu.Item name="login" active="login"/>
        </Menu.Menu>
    );

    renderUserData = (logout, user) => (
        <Menu.Menu position="right">
            {user.email ? (
                <Menu.Item name={user.email}/>
            ) : (
                <Menu.Item name={user.email}/>
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

    render() {
        const {logout, user} = this.props;
        return (
            <Menu pointing secondary>
                {JSON.stringify(user) === JSON.stringify({})
                    ? this.renderLoginButton()
                    : this.renderUserData(logout, user)}
            </Menu>
        );
    }
}

function mapStateToProps({user}) {
    return {
        user
    };
}

export default connect(mapStateToProps, auths)(Header);
