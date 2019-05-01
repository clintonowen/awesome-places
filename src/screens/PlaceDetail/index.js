import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';

export class PlaceDetail extends Component {
  placeDeletedHandler () {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={this.props.selectedPlace.image}
          style={styles.placeImage}
        />
        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        <View>
          <TouchableOpacity onPress={() => this.placeDeletedHandler()}>
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
    margin: 22
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
