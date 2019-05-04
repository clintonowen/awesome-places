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
      },
      locationChosen: false
    };
    this.pickLocationHandler = this.pickLocationHandler.bind(this);
    this.getLocationHandler = this.getLocationHandler.bind(this);
  }

  pickLocationHandler (event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude,
      longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude,
          longitude
        },
        locationChosen: true
      };
    });
    this.props.onLocationPick({ latitude, longitude });
  }

  getLocationHandler () {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude,
            longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
    err => {
      console.log(err);
      alert('Fetching your location failed. Please click on the map to pick one manually.');
    });
  }

  render () {
    let marker;

    if (this.state.locationChosen) {
      marker = (
        <MapView.Marker coordinate={this.state.focusedLocation} />
      );
    }

    return (
      <React.Fragment>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => { this.map = ref; }}
        >
          {marker}
        </MapView>
        <ButtonWithBackground
          color='#2196F3'
          onPress={this.getLocationHandler}
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
