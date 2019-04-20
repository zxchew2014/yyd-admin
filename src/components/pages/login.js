import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import LoginForm from "../forms/login";
import VerifyEmailPage from "./verify-email";

class LoginPage extends React.Component {
  submit = () => {
    this.props.login();
  };

  render() {
    const { user } = this.props;
    if (user === null) {
      return (
        <div>
          <LoginForm submit={this.submit} />
        </div>
      );
    }
    if (!user.emailVerified) {
      return <VerifyEmailPage />;
    }
    return null;
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
