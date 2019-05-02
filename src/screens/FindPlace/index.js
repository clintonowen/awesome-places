import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated
} from 'react-native';
import { PLACE_DETAIL_SCREEN } from '../../navigation/Screens';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList';

class FindPlaceScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      placesLoaded: false,
      buttonAnim: new Animated.Value(1),
      placesAnim: new Animated.Value(0)
    };
    this.itemSelectedHandler = this.itemSelectedHandler.bind(this);
    this.placesSearchHandler = this.placesSearchHandler.bind(this);
    this.navEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount () {
    if (this.navEventListener) {
      this.navEventListener.remove();
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

  itemSelectedHandler (key) {
    const selectedPlace = this.props.places.find(place => place.key === key);

    Navigation.push(this.props.componentId, {
      component: {
        name: PLACE_DETAIL_SCREEN,
        passProps: {
          selectedPlace
        },
        options: {
          topBar: {
            title: {
              text: selectedPlace.name
            }
          }
        }
      }
    });
  }

  placesLoadedHandler () {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  placesSearchHandler () {
    Animated.timing(this.state.buttonAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  }

  render () {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.buttonAnim,
          transform: [
            {
              scale: this.state.buttonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View style={{ opacity: this.state.placesAnim }}>
          <PlaceList
            places={this.props.places}
            onSelectItem={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }

    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderRadius: 50,
    borderWidth: 3,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
