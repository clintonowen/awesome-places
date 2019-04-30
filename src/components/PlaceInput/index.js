import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
// import placeImage from '../../assets/beautiful-place.jpg';

class PlaceInput extends Component {
  constructor (props) {
    super(props);
    this.state = {
      placeName: ''
    };
  }

  placeNameChangedHandler (val) {
    this.setState({
      placeName: val
    });
  }

  placeSubmitHandler () {
    if (this.state.placeName.trim() !== '') {
      this.props.onSubmitPlace(this.state.placeName);
    }
  }

  render () {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.placeInput}
          onChangeText={val => this.placeNameChangedHandler(val)}
          placeholder='An Awesome Place'
          value={this.state.placeName}
        />
        <Button
          onPress={() => this.placeSubmitHandler()}
          title='Add'
          style={styles.placeButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});

export default PlaceInput;
