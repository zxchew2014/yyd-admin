import React from "react";
import {Button, Item, List, Popup} from "semantic-ui-react";

class NewsUpdatePopup extends React.Component {

    render() {
        return (
            <Popup trigger={<Button circular icon='help' />}>
                <Popup.Header>News Update</Popup.Header>
                <Popup.Content>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header>4 Nov 2024 v3.3</Item.Header>
                                <Item.Description>
                                    <List bulleted>
                                        <List.Item>Add news update</List.Item>
                                        <List.Item>Add on branch code for attendance summary purpose</List.Item>
                                        <List.Item>Add feature flag for payout display (currently set as false)</List.Item>
                                    </List>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Popup.Content>
            </Popup>

        )
    }
}

export default NewsUpdatePopup;