import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../ListItem';

const PlaceList = (props) => {
  return (
    <FlatList
      data={props.places}
      renderItem={(info) => (
        <ListItem
          key={info.item.key}
          onPressItem={() => props.handlePressItem(info.item.key)}
          placeName={info.item.name}
          placeImage={info.item.image}
        />
      )}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default PlaceList;
