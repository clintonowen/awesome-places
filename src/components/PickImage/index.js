import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import imagePlaceholder from '../../assets/beautiful-place.jpg';

export class PickImage extends Component {
  render () {
    return (
      <React.Fragment>
        <View style={styles.placeholder}>
          <Image source={imagePlaceholder} style={styles.previewImage} />
        </View>
        <ButtonWithBackground
          color='#2196F3'
          onPress={() => alert('Pick Image!')}
        >
          Pick Image
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
  },
  previewImage: {
    height: '100%',
    width: '100%'
  }
});

export default PickImage;
