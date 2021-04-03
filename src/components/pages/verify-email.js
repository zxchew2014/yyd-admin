import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import {VERIFY_EMAIL_MSG} from "../../utils/common";

class VerifyEmailPage extends React.Component {
  render() {
    return (
      <Message warning header={VERIFY_EMAIL_MSG} />
    );
  }
}

export default connect(
  null,
  {}
)(VerifyEmailPage);
