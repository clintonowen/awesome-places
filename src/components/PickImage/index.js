import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';

export class PickImage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pickedImage: null
    };
    this.pickImageHandler = this.pickImageHandler.bind(this);
  }

  pickImageHandler () {
    ImagePicker.showImagePicker({ title: 'Add an Image' }, res => {
      if (res.didCancel) {
        console.log('User canceled!');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePick({
          uri: res.uri,
          base64: res.data
        });
      }
    });
  }

  render () {
    return (
      <React.Fragment>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <ButtonWithBackground
          color='#2196F3'
          onPress={this.pickImageHandler}
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
