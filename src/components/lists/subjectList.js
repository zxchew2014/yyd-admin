import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import ItemList from "../items/itemList";

class StudentSubjectList extends React.Component {
  render() {
    const { student } = this.props;
    return (
      <List>
        <ItemList value={student.english} description={"English"} />
        <ItemList value={student.math} description={"Math"} />
        <ItemList value={student.science} description={"Science"} />
      </List>
    );
  }
}

StudentSubjectList.propTypes = {
  student: PropTypes.object
};

export default StudentSubjectList;
