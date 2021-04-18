import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { Button, Card, Icon, Text } from "react-native-elements";

import { commonStyles } from "../utils/styles";
import { default as Flashcard } from "./Card";

class Quiz extends Component {
  state = { score: 0, currentQuestionId: 0, shouldShowQuestion: true };

  handleFlipCard = () => {
    this.setState(previousState => {
      return { shouldShowQuestion: !previousState.shouldShowQuestion };
    });
  };

  handleResponse = async ({ isCorrect }) => {
    if (isCorrect === true) {
      this.setState(previousState => {
        return { score: previousState.score + 1 };
      });
    }

    // increment state.currentQuestionId
    this.setState(previousState => {
      return {
        currentQuestionId: previousState.currentQuestionId + 1,
        shouldShowQuestion: true
      };
    });

    // user has completed at least one quiz for today
    // therefore reset notification (no notification for today)
    // and set new notification (new notification from tomorrow)
    await clearLocalNotification();
    setLocalNotification();
  };

  quiz() {
    const { deck } = this.props;
    const { currentQuestionId } = this.state;

    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <Text>Quiz for deck: {deck.title}</Text>
        <Text>
          Question: {currentQuestionId + 1} of {deck.questions.length}
        </Text>
        <Card>
          <Flashcard
            card={deck.questions[currentQuestionId]}
            shouldShowQuestion={this.state.shouldShowQuestion}
            handleFlipCard={this.handleFlipCard}
          />
        </Card>
        <View
          style={{
            ...commonStyles.flashcardsButtonContainer,
            flexDirection: "row"
          }}
        >
          <Button
            onPress={() => {
              this.handleResponse({ isCorrect: true });
            }}
            title="Correct"
            buttonStyle={{
              backgroundColor: "darkgreen",
              width: 120
            }}
            icon={
              <Icon
                name="check-circle"
                size={15}
                color="white"
                iconStyle={{ marginRight: 5 }}
              />
            }
          />
          <View style={{ width: 20 }} />
          <Button
            onPress={() => {
              this.handleResponse({ isCorrect: false });
            }}
            title="Incorrect"
            buttonStyle={{
              backgroundColor: "darkred",
              width: 120
            }}
            icon={
              <Icon
                name="cancel"
                size={15}
                color="white"
                iconStyle={{ marginRight: 5 }}
              />
            }
          />
        </View>
      </ScrollView>
    );
  }

  quizResult() {
    const { navigation, deck } = this.props;

    let score = 0;
    if (deck.questions.length !== 0) {
      score =
        Math.round((this.state.score / deck.questions.length) * 10000) / 100;
    }

    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <Text>Quiz result for deck: {deck.title}</Text>
        <Text>Total questions {deck.questions.length}</Text>

        <Card
          wrapperStyle={{
            // flex: 1,
            alignItems: "center"
          }}
        >
          <Text h2>You scored</Text>
          <Text h2>{score} %</Text>
        </Card>

        <View style={commonStyles.flashcardsButtonContainer}>
          <Button
            onPress={() => {
              this.setState({ score: 0, currentQuestionId: 0 });
            }}
            title="Restart Quiz"
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
            onPress={() => {
              navigation.navigate("Deck");
            }}
            title="Back to Deck"
            icon={
              <Icon
                name="arrow-back"
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
        </View>
      </ScrollView>
    );
  }

  render() {
    const { deck } = this.props;

    if (!deck) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (deck.questions.length === 0) {
      return (
        <ScrollView style={commonStyles.genericTextContainer}>
          <Text h5>
            The number of questions for this deck is zero. Please add some cards
            then start the quiz.
          </Text>
        </ScrollView>
      );
    }

    if (this.state.currentQuestionId === deck.questions.length) {
      return this.quizResult();
    }

    return this.quiz();
  }
}

const mapStateToProps = (decks, ownProps) => {
  //const { deckId } = ownProps.navigation.state.params;
  const { deckId } = ownProps.route.params;
  const deck = decks[deckId];
  return { deckId, deck };
};

export default connect(mapStateToProps)(Quiz);
