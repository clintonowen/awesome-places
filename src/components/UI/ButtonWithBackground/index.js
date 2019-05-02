import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

const buttonWithBackground = props => {
  const content = (
    <View style={[
      styles.button,
      { backgroundColor: props.color },
      props.disabled ? styles.disabledButton : null
    ]}>
      <Text style={[
        styles.text,
        props.disabled ? styles.disabledText : null
      ]}>
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) {
    return content;
  } else if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  } else {
    // Platform.OS === 'ios'
    return (
      <TouchableOpacity onPress={props.onPress}>
        {content}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    padding: 8,
    margin: 8
  },
  disabledButton: {
    backgroundColor: '#EEE'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  disabledText: {
    color: '#AAA'
  }
});

export default buttonWithBackground;
