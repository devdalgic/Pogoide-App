import React from 'react';
import {Text} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph, DefaultTheme} from 'react-native-paper';
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia} from "rn-placeholder";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


const EventItem = ({event}) => (
    <Card
        style={{
            card: true,
            margin: 8,
        }}
    >
        <Card.Cover source={{ uri: event.thumbnail }}
                    style={{height: verticalScale(100)}}/>
        <Card.Content>
            <Title style={{fontSize: verticalScale(15)}}>{event.title}</Title>
            <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>Starts:</Text>
                <Text style={{fontSize: verticalScale(11)}}> {event.start}</Text></Paragraph>
            <Paragraph><Text style={{fontWeight: "bold", fontSize: verticalScale(11)}}>Ends:</Text>
                <Text style={{fontSize: verticalScale(11)}}>   {event.end}</Text></Paragraph>
        </Card.Content>
    </Card>
);

export default EventItem;

export const PlaceholderEvent = () => (
    <Card
        style={{
            card: true,
            margin: 8,
        }}
    >
        <Card.Content>
            <Placeholder
                Animation={Fade}
            >
                <PlaceholderMedia style={{
                    width: 400,
                    height: 200,
                    margin: -16,
                    alignSelf: 'center'}}/>
                <PlaceholderLine width={40} style={{marginTop: 25}}/>
                <PlaceholderLine />
                <PlaceholderLine />
            </Placeholder>
        </Card.Content>
    </Card>
)