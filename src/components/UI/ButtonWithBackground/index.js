import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const buttonWithBackground = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={[styles.button, { backgroundColor: props.color }]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    margin: 5
  },
  text: {
    color: 'black'
  }
});

export default buttonWithBackground;
