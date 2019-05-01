import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput';
import { addPlace } from '../../store/actions';

class SharePlaceScreen extends Component {
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

  placeAddedHandler (placeName) {
    this.props.onAddPlace(placeName);
  }

  render () {
    return (
      <View>
        <PlaceInput
          onSubmitPlace={(placeName) => this.placeAddedHandler(placeName)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
