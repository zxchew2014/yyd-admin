import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

class VerifyEmailPage extends React.Component {
  render() {
    return (
      <Message warning header="Please verify you email first to access!" />
    );
  }
}

export default connect(
  null,
  {}
)(VerifyEmailPage);
