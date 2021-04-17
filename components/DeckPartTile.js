import React, { Component } from "react";
import { Card, Text } from "react-native-elements";
import { createRgbaFromAnyText } from "../utils/helper";

class DeckPartTile extends Component {
  render() {
    const { deck } = this.props;
    const cardsText = deck.questions.length > 1 ? "cards" : "card";
    const [r, g, b, a] = createRgbaFromAnyText(deck.title);

    return (
      <Card
        containerStyle={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
      >
        <Text h4>{deck.title}</Text>
        <Text>
          {deck.questions.length} {cardsText}
        </Text>
      </Card>
    );
  }
}

export default DeckPartTile;
