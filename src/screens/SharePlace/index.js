import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
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

const initialState = {
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
    },
    image: {
      value: null,
      valid: false
    }
  }
};

class SharePlaceScreen extends Component {
  constructor (props) {
    super(props);
    this.state = { ...initialState };

    this.resetState = this.resetState.bind(this);
    this.placeNameChangedHandler = this.placeNameChangedHandler.bind(this);
    this.locationPickedHandler = this.locationPickedHandler.bind(this);
    this.imagePickedHandler = this.imagePickedHandler.bind(this);
    this.placeAddedHandler = this.placeAddedHandler.bind(this);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.resetState();
      Navigation.mergeOptions('BottomTabsId', {
        bottomTabs: {
          currentTabIndex: 0
        }
      });
    }
  }

  componentWillUnmount () {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  resetState () {
    this.setState({ ...initialState });
    this.imagePicker.resetState();
    this.locationPicker.resetState();
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

  imagePickedHandler (image) {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  }

  placeAddedHandler () {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
  }

  render () {
    let submitButton = (
      <ButtonWithBackground
        color='#2196F3'
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      >
        Share the Place!
      </ButtonWithBackground>
    );
    if (this.props.isLoading) {
      submitButton = (
        <ActivityIndicator />
      );
    }
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <MainText>
              <HeadingText>Share a Place with us!</HeadingText>
            </MainText>
            <PickImage
              onImagePick={this.imagePickedHandler}
              ref={ref => (this.imagePicker = ref)}
            />
            <PickLocation
              onLocationPick={this.locationPickedHandler}
              ref={ref => (this.locationPicker = ref)}
            />
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
            />
            <View style={styles.button}>
              {submitButton}
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

const mapStateToProps = state => {
  return {
    isLoading: state.places.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
