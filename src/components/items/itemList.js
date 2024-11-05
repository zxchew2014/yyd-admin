import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import ItemIcon from "./itemIcon";

class ItemList extends React.Component {
  render() {
    const { value, description } = this.props;
    return (
      <List.Item>
        <ItemIcon value={value} />
        <List.Content>
          <List.Description>{description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

ItemList.propTypes = {
  value: PropTypes.bool,
  description: PropTypes.string
};

export default ItemList;
