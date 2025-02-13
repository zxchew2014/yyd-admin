import React from "react";
import { Button, Item, List, Popup } from "semantic-ui-react";

class NewsUpdatePopup extends React.Component {
  render() {
    return (
      <Popup trigger={<Button circular icon="help" />}>
        <Popup.Header>Latest Update</Popup.Header>
        <Popup.Content>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>14 Feb 2025 v3.6</Item.Header>
                <Item.Description>
                  <List bulleted>
                    <List.Item>Refactor student list in branch not active and student page</List.Item>
                  </List>
                </Item.Description>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Item.Header>12 Jan 2025 v3.5</Item.Header>
                <Item.Description>
                  <List bulleted>
                    <List.Item>Remove email verify step</List.Item>
                  </List>
                </Item.Description>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Item.Header>10 Nov 2024 v3.4</Item.Header>
                <Item.Description>
                  <List bulleted>
                    <List.Item>Secondary 1 student able to fill up</List.Item>
                    <List.Item>Subject grouping is allowed as well</List.Item>
                    <List.Item>
                      Secondary student update and remove is up as well
                    </List.Item>
                    <List.Item>
                      Refactor old code for secondary subject
                    </List.Item>
                    <List.Item>
                      Attendance summary indicate multiple branches taught by
                      each teacher
                    </List.Item>
                  </List>
                </Item.Description>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Item.Header>4 Nov 2024 v3.3</Item.Header>
                <Item.Description>
                  <List bulleted>
                    <List.Item>Add news update</List.Item>
                    <List.Item>
                      Add on branch code for attendance summary purpose
                    </List.Item>
                    <List.Item>
                      Add feature flag for payout display (currently set as
                      false)
                    </List.Item>
                  </List>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Popup.Content>
      </Popup>
    );
  }
}

export default NewsUpdatePopup;
