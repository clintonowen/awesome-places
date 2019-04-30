import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = (props) => {
  let modalContent = null;
  let modalButtons = null;

  if (props.selectedPlace) {
    modalContent = (
      <React.Fragment>
        <Image
          source={props.selectedPlace.image}
          style={styles.placeImage}
        />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </React.Fragment>
    );
    modalButtons = (
      <View>
        <TouchableOpacity onPress={() => props.onDeleteItem(props.selectedPlace.key)}>
          <View style={styles.deleteIcon}>
            <Icon size={30} name='ios-trash' color='red' />
          </View>
        </TouchableOpacity>
        <Button
          onPress={() => props.onCloseModal()}
          title='Close'
        />
      </View>
    );
  }

  return (
    <Modal
      animationType='slide'
      onRequestClose={() => props.onCloseModal()}
      visible={props.selectedPlace !== null}
    >
      <View style={styles.modalContainer}>
        {modalContent}
        {modalButtons}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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

export default PlaceDetail;
