import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const ListItem = (props) => (
  <TouchableOpacity onPress={props.onPressItem}>
    <View style={styles.listItem}>
      <Image
        source={props.placeImage}
        style={styles.placeImage}
      />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: '#eee',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    width: '100%'
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default ListItem;
