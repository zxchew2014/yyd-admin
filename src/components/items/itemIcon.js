import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

class ItemIcon extends React.Component {
  render() {
    const { value } = this.props;
    if (value) return <Icon color="green" name="check" />;
    return <Icon color="red" name="close" />;
  }
}

ItemIcon.propTypes = {
  value: PropTypes.bool
};

export default ItemIcon;
