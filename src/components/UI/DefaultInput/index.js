import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
  <TextInput
    {...props}
    underlineColorAndroid='transparent'
    style={[
      styles.input,
      props.style,
      !props.touched || props.valid ? null : styles.invalid
    ]}
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
  },
  invalid: {
    backgroundColor: '#F9C0C0',
    borderColor: 'red'
  }
});

export default defaultInput;
