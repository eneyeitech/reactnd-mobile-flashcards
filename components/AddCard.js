import React, { Component } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View
} from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { connect } from "react-redux";

import { saveCardInStorage } from "../utils/api";
import { createCardObject } from "../utils/helpers";
import { addCard } from "../actions";
import { commonStyles } from "../utils/styles";
import SubmitButton from "./SubmitButton";

class AddCard extends Component {
  state = { question: "", answer: "" };

  onChangeTextQuestion = text => {
    this.setState({ question: text });
  };

  onChangeTextAnswer = text => {
    this.setState({ answer: text });
  };

  handleAddCard = async () => {
    //const { deckId } = this.props.navigation.state.params;
    const deckId = 1;
    const { question, answer } = this.state;

    if (!question || !answer) {
      Alert.alert(
        "Question and Answer Required",
        "Please provide both a question and an answer.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    // add card, then navigate back to deck
    const { addCard } = this.props;
    const { goBack } = this.props.navigation;
    const card = createCardObject(question, answer);
    await saveCardInStorage(card, deckId);
    addCard(card, deckId);
    goBack();
  };

  render() {
    //const { deckId } = this.props.navigation.state.params;
    const deckId = 1;
    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Text h4 style={{ marginBottom: 20 }}>
            Add a card to deck: {deckId}
          </Text>
          <Input
            placeholder="Type your question here"
            onChangeText={this.onChangeTextQuestion}
            inputStyle={{}}
            leftIcon={
              <Icon
                name="comment-question-outline"
                type="material-community"
                size={24}
                color="black"
                iconStyle={{ marginRight: 10 }}
              />
            }
          />
          <Input
            onChangeText={this.onChangeTextAnswer}
            placeholder="Type your answer here"
            multiline={true}
            inputStyle={{
              height: 100,
              textAlignVertical: "top"
            }}
            leftIcon={
              <Icon
                name="message-reply-text"
                type="material-community"
                size={24}
                color="black"
                iconStyle={{ marginRight: 10, marginBottom: 90 }}
              />
            }
          />
          <View style={commonStyles.flashcardsButtonContainer}>
            <SubmitButton handleOnPress={this.handleAddCard} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { addCard }
)(AddCard);
