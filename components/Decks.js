import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";

import {
  fetchDecksFromStorage,
  removeAllDecksFromStorage,
  saveAllDecksInStorage,
  getData
} from "../utils/api";
import { loadDecks } from "../actions";
import DeckPartTile from "./DeckPartTile";

class Decks extends Component {
  state = { ready: false };

  async componentDidMount() {
     //await removeAllDecksFromStorage();

    const { loadDecks } = this.props;

    let decks = await fetchDecksFromStorage();
    if (decks === null) {
      // first time running the app, set some dummy data
      // then fetch again
      await saveAllDecksInStorage(getData());
      decks = await fetchDecksFromStorage();
    }
    loadDecks(decks);
    // console.log("Decks", decks);

    this.setState({ ready: true });
  }

  handleOnPress = deckId => {
    const { navigate, push } = this.props.navigation;
    push("Deck", { deckId });
  };

  render() {
    if (!this.state.ready) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    const { decks } = this.props;
    // console.log(decks);

    return (
      <ScrollView>
        {Object.keys(decks).map(deckId => {
          const deck = decks[deckId];
          return (
            <TouchableOpacity
              key={deckId}
              onPress={() => this.handleOnPress(deckId)}
            >
              <DeckPartTile deck={deck} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  // console.log("mapStateToProps decks", decks);
  return { decks };
};

export default connect(
  mapStateToProps,
  { loadDecks }
)(Decks);
