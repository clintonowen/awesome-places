import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from '../../assets/beautiful-place.jpg';

export class PickImage extends Component {
  render () {
    return (
      <React.Fragment>
        <View style={styles.placeholder}>
          <Image source={imagePlaceholder} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title='Pick Image' onPress={() => alert('Pick Image!')} />
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
  previewImage: {
    height: '100%',
    width: '100%'
  },
  button: {
    margin: 8
  }
});

export default PickImage;
