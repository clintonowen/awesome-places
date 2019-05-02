import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';

export class PlaceDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get('window').height > 500
        ? 'portrait' : 'landscape'
    };
    this.updateStyles = this.updateStyles.bind(this);
    this.placeDeletedHandler = this.placeDeletedHandler.bind(this);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles (dims) {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  placeDeletedHandler () {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  }

  render () {
    return (
      <View
        style={[
          styles.container,
          styles[`${this.state.viewMode}Container`]
        ]}
      >
        <View style={styles.subContainer}>
          <Image
            source={this.props.selectedPlace.image}
            style={styles.placeImage}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteIcon}>
              <Icon
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={30}
                color='red'
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  subContainer: {
    flex: 1
  },
  placeImage: {
    height: 200,
    resizeMode: 'contain',
    width: '100%'
  },
  placeName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deleteIcon: {
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
