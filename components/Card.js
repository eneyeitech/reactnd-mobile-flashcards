import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";

class Card extends Component {
  // state = { shouldShowQuestion: true };
  // flipCard = () => {
  //   this.setState(previousState => {
  //     return { shouldShowQuestion: !previousState.shouldShowQuestion };
  //   });
  // };

  showQuestion(handleFlipCard) {
    const { card } = this.props;
    return (
      <View>
        <Text h2>{card.question}</Text>
        <Button
          onPress={handleFlipCard}
          title="View Answer"
          buttonStyle={style.qaButton}
        />
      </View>
    );
  }

  showAnswer(handleFlipCard) {
    const { card } = this.props;
    return (
      <View>
        <Text h4>{card.answer}</Text>
        <Button
          onPress={handleFlipCard}
          title="View Question"
          buttonStyle={style.qaButton}
        />
      </View>
    );
  }

  render() {
    // console.log(card);
    const { shouldShowQuestion, handleFlipCard } = this.props;
    return shouldShowQuestion
      ? this.showQuestion(handleFlipCard)
      : this.showAnswer(handleFlipCard);
  }
}

const style = StyleSheet.create({
  qaButton: { backgroundColor: "gray", marginTop: 20 }
});

export default Card;
