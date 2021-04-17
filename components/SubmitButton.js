import React, { Component } from "react";
import { Button, Icon } from "react-native-elements";
import { commonStyles } from "../utils/styles";

class SubmitButton extends Component {
  render() {
    const { handleOnPress } = this.props;
    return (
      <Button
        onPress={handleOnPress}
        title="Submit"
        iconRight={true}
        icon={
          <Icon
            name="arrow-forward"
            size={15}
            color="white"
            iconStyle={{ marginLeft: 10 }}
          />
        }
        buttonStyle={commonStyles.flashcardsButton}
      />
    );
  }
}

export default SubmitButton;
