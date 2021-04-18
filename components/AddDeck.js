import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Icon, Input, Text } from "react-native-elements";

import { saveDeckInStorage } from "../utils/api";
import { createDeckObject } from "../utils/helpers";
import { commonStyles } from "../utils/styles";
import { addDeck } from "../actions";
import SubmitButton from "./SubmitButton";

class AddDeck extends Component {
  state = { deckTitle: "" };

  onChangeText = text => {
    this.setState({ deckTitle: text });
  };

  handleAddDeck = async () => {
    const { deckTitle } = this.state;
    const { navigate } = this.props.navigation;

    if (!deckTitle) {
      Alert.alert(
        "Deck Title Required",
        "Deck title was empty, please provide a deck title.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const { decks } = this.props;
    if (decks[deckTitle]) {
      Alert.alert(
        "Deck Already Exists",
        "Another deck with the same title already exists, please provide a different deck title.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    // add deck, reset title, then navigate to the freshly created deck
    
    const deck = createDeckObject(deckTitle);
    await saveDeckInStorage(deck);
    await this.props.dispatch(addDeck(deck));
    this.setState({ deckTitle: "" });
    navigate("Deck", { deckId: deckTitle });
  };

  render() {
    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Text h4 style={{ marginBottom: 20 }}>
            What's the Title of Your New Deck?
          </Text>
          <Input
            placeholder="Type the title of your deck"
            value={this.state.deckTitle}
            onChangeText={this.onChangeText}
            leftIcon={
              <Icon
                name="cards-outline"
                type="material-community"
                size={24}
                color="black"
                iconStyle={{ marginRight: 10 }}
              />
            }
          />
          <View style={commonStyles.flashcardsButtonContainer}>
            <SubmitButton handleOnPress={this.handleAddDeck} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  return { decks };
};

export default connect(
  mapStateToProps
)(AddDeck);
