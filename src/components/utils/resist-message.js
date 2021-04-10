import React from "react";
import { Message } from "semantic-ui-react";
import { CONTACT_ADMIN_MSG, NO_ACCESS_MSG } from "../../utils/common";

class ResistMessage extends React.Component {

  render() {
    return (
      <Message error header={NO_ACCESS_MSG} list={[CONTACT_ADMIN_MSG]} />
    );
  }
}

export default ResistMessage;
