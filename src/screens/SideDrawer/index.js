import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

export class SideDrawer extends Component {
  render () {
    return (
      <View
        style={[
          styles.container,
          // Leave width below for dynamic recalculation on screen rotation
          { width: Dimensions.get('window').width * 0.8 }
        ]}>
        <Text>SideDrawer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 22
  }
});

export default SideDrawer;
