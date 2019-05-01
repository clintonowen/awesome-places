import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export class PickLocation extends Component {
  render () {
    return (
      <React.Fragment>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button title='Locate Me' onPress={() => alert('Pick Location!')} />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#EEE',
    borderColor: 'black',
    borderWidth: 1,
    height: 150,
    width: '80%'
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
