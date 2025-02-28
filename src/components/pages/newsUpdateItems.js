import React from "react";
import { Button, Item, List, Popup } from "semantic-ui-react";
import { newItems } from "../../utils/newItems";

class NewsUpdatePopup extends React.Component {
  render() {
    const retrieveItems = () =>
      newItems.map(item => (
        <Item key={`${item.date}-${item.version}`}>
          <Item.Content>
            <Item.Header>
              {item.date} {item.version}
            </Item.Header>
            <Item.Description>
              <List bulleted>
                {item.description.map((i, index) => (
                  <List.Item key={index}>{i.itemDescription}</List.Item>
                ))}
              </List>
            </Item.Description>
          </Item.Content>
        </Item>
      ));

    return (
      <Popup trigger={<Button circular icon="help" />}>
        <Popup.Header>Latest Updates</Popup.Header>
        <Popup.Content>
          <Item.Group>{retrieveItems()}</Item.Group>
        </Popup.Content>
      </Popup>
    );
  }
}

export default NewsUpdatePopup;
