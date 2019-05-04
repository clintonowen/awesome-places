import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';
import validate from '../../utils/validators';
import PlaceInput from '../../components/PlaceInput';
import PickImage from '../../components/PickImage';
import PickLocation from '../../components/PickLocation';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';

class SharePlaceScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          rules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        }
      }
    };
    this.placeNameChangedHandler = this.placeNameChangedHandler.bind(this);
    this.locationPickedHandler = this.locationPickedHandler.bind(this);
    this.placeAddedHandler = this.placeAddedHandler.bind(this);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount () {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed ({ buttonId }) {
    switch (buttonId) {
      case 'sideDrawerButton':
        Navigation.mergeOptions(this.props.componentId, {
          sideMenu: {
            left: { visible: true }
          }
        });
        break;
      default:
        break;
    }
  }

  placeNameChangedHandler (value) {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value,
            valid: validate(value, prevState.controls.placeName.rules),
            touched: true
          }
        }
      };
    });
  }

  locationPickedHandler (location) {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  }

  placeAddedHandler () {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value
    );
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a Place with us!</HeadingText>
            </MainText>
            <PickImage />
            <PickLocation onLocationPick={this.locationPickedHandler} />
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
            />
            <View style={styles.button}>
              <ButtonWithBackground
                color='#2196F3'
                onPress={this.placeAddedHandler}
                disabled={
                  !this.state.controls.placeName.valid ||
                  !this.state.controls.location.valid
                }
              >
                Share the Place!
              </ButtonWithBackground>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  button: {
    margin: 8
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
  };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
