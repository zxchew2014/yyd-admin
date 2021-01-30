import React from "react";
import { Message } from "semantic-ui-react";

class ResistMessage extends React.Component {
  render() {
    return (
      <Message
        error
        header="You do not have access on this system"
        list={["Please contact Admin to add you for access right."]}
      />
    );
  }
}

export default ResistMessage;
