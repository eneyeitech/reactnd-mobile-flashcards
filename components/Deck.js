import React, { Component } from "react";
import { Alert, ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button, Icon, Text } from "react-native-elements";

import { removeDeckFromStorage } from "../utils/api";
import { commonStyles } from "../utils/styles";
import { deleteDeck } from "../actions";
import DeckPartTile from "./DeckPartTile";

class Deck extends Component {
  handleAddCard = () => {
    const { navigate } = this.props.navigation;
    const { deckId } = this.props.navigation.state.params;
    navigate("AddCard", { deckId: deckId });
  };

  handleStartQuiz = () => {
    const { navigate } = this.props.navigation;
    const { deckId } = this.props.navigation.state.params;
    navigate("Quiz", { deckId: deckId });
  };

  handleDeleteDeck = () => {
    // delete deck, then go back
    // const { deckId } = this.props.navigation.state.params;
    const { deck, navigation } = this.props;

    Alert.alert(
      "Delete Deck",
      `Are you sure you want to delete the deck ${deck.title}?`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: async () => {
            const { deleteDeck } = this.props;
            await removeDeckFromStorage(deck.title);
            deleteDeck(deck.title);
            navigation.navigate("Decks");
          }
        }
      ],
      { cancelable: true }
    );
  };
  render() {
    const { deck } = this.props;

    if (!deck) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <DeckPartTile deck={deck} />
        <View style={commonStyles.flashcardsButtonContainer}>
          <Button
            onPress={this.handleAddCard}
            title="Add Card"
            icon={
              <Icon
                name="add"
                type="material"
                size={15}
                color="white"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              ...commonStyles.flashcardsButton,
              backgroundColor: "gray"
            }}
          />
          <Button
            onPress={this.handleStartQuiz}
            title="Start Quiz"
            icon={
              <Icon
                name="school"
                size={15}
                color="white"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={commonStyles.flashcardsButton}
          />
          <Button
            onPress={this.handleDeleteDeck}
            title="Delete Deck"
            icon={
              <Icon
                name="delete"
                size={15}
                color="white"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              ...commonStyles.flashcardsButton,
              backgroundColor: "darkred"
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks[deckId];
  return { deck };
};

export default connect(
  mapStateToProps,
  { deleteDeck }
)(Deck);
