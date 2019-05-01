import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View } from 'react-native';
import { PLACE_DETAIL_SCREEN } from '../../navigation/Screens';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList';

class FindPlaceScreen extends Component {
  constructor (props) {
    super(props);
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

  render () {
    return (
      <View>
        <PlaceList
          places={this.props.places}
          onSelectItem={(key) => this.itemSelectedHandler(key)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
