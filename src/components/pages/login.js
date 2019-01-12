import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {login } from "../../actions/auth";
import LoginForm from "../forms/login";

class LoginPage extends React.Component {
  submit = () => {
      this.props.login();
  };

  render() {
    return (
      <div>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
