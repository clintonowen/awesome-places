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
    borderRadius: 2,
    padding: 8,
    margin: 8
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default buttonWithBackground;
