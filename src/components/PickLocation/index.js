import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';

export class PickLocation extends Component {
  render () {
    return (
      <React.Fragment>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <ButtonWithBackground
          color='#2196F3'
          onPress={() => alert('Pick Location!')}
        >
          Locate Me
        </ButtonWithBackground>
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
  }
});

export default PickLocation;
