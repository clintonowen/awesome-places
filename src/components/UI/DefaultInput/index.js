import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
  <TextInput
    {...props}
    underlineColorAndroid='transparent'
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    borderColor: '#EEE',
    borderWidth: 1,
    padding: 5,
    marginBottom: 8,
    marginTop: 8,
    width: '100%'
  }
});

export default defaultInput;
