import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { loadAuthScreen } from '../../navigation';
import { clearAuth } from '../../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';

export class SideDrawer extends Component {
  constructor (props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout () {
    loadAuthScreen();
    this.props.onLogout();
  }

  render () {
    return (
      <View
        style={[
          styles.container,
          // Leave width below for dynamic recalculation on screen rotation
          { width: Dimensions.get('window').width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.handleLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color='#AAA'
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 30
  },
  drawerItem: {
    alignItems: 'center',
    backgroundColor: '#EEE',
    flexDirection: 'row',
    padding: 10
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(clearAuth())
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);
