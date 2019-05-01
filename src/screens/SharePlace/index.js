import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';
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
      placeName: ''
    };
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

  placeNameChangedHandler (placeName) {
    this.setState({
      placeName
    });
  }

  placeAddedHandler () {
    if (this.state.placeName.trim() !== '') {
      this.props.onAddPlace(this.state.placeName);
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeName={this.state.placeName}
            onChangeText={(name) => this.placeNameChangedHandler(name)}
          />
          <View style={styles.button}>
            <ButtonWithBackground
              color='#2196F3'
              onPress={() => this.placeAddedHandler()}
            >
              Share the Place!
            </ButtonWithBackground>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
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
