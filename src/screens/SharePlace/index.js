import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard
} from 'react-native';
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
      kbAvoid: true,
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          rules: {
            notEmpty: true
          }
        }
      }
    };
    this.setKbAvoid = this.setKbAvoid.bind(this);
    this.placeNameChangedHandler = this.placeNameChangedHandler.bind(this);
    this.placeAddedHandler = this.placeAddedHandler.bind(this);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    Keyboard.addListener('keyboardDidShow', this.setKbAvoid);
    Keyboard.addListener('keyboardDidHide', this.setKbAvoid);
  }

  componentWillUnmount () {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    Keyboard.removeAllListeners('keyboardDidShow');
    Keyboard.removeAllListeners('keyboardDidHide');
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

  setKbAvoid () {
    this.setState(prevState => {
      return {
        kbAvoid: !prevState.kbAvoid
      };
    });
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

  placeAddedHandler () {
    if (this.state.controls.placeName.value.trim() !== '') {
      this.props.onAddPlace(this.state.controls.placeName.value);
    }
  }

  render () {
    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <KeyboardAvoidingView
              style={styles.container}
              behavior='padding'
              enabled={this.state.kbAvoid}
            >
              <MainText>
                <HeadingText>Share a Place with us!</HeadingText>
              </MainText>
              <PickImage />
              <PickLocation />
              <PlaceInput
                placeData={this.state.controls.placeName}
                onChangeText={this.placeNameChangedHandler}
              />
              <View style={styles.button}>
                <ButtonWithBackground
                  color='#2196F3'
                  onPress={this.placeAddedHandler}
                  disabled={!this.state.controls.placeName.valid}
                >
                  Share the Place!
                </ButtonWithBackground>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
