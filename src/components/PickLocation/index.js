import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';

export class PickLocation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      focusedLocation: {
        latitude: 41.8339037,
        longitude: -87.8720463,
        latitudeDelta: 0.4,
        longitudeDelta:
          Dimensions.get('window').width /
          Dimensions.get('window').height *
          0.0522
      }
    };
  }
  render () {
    return (
      <React.Fragment>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
        />
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
  map: {
    height: 250,
    width: '100%'
  }
});

export default PickLocation;
