import { Navigation } from 'react-native-navigation';
import AuthScreen from '../../screens/Auth';
import FindPlaceScreen from '../../screens/FindPlace';
import SharePlaceScreen from '../../screens/SharePlace';

// Register Screens
Navigation.registerComponent('awesome-places.AuthScreen', () => AuthScreen);
Navigation.registerComponent('awesome-places.SharePlaceScreen', () => SharePlaceScreen);
Navigation.registerComponent('awesome-places.FindPlaceScreen', () => FindPlaceScreen);

// Start the App
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'awesome-places.AuthScreen',
            options: {
              topBar: {
                title: {
                  text: 'Login'
                }
              }
            }
          }
        }]
      }
    }
  });
});

// import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import PlaceInput from '../PlaceInput';
// import PlaceList from '../PlaceList';
// import PlaceDetail from '../PlaceDetail';
// import {
//   addPlace, deletePlace, selectPlace, deselectPlace
// } from '../../store/actions';

// // type Props = {};

// export class App extends Component {
//   addPlaceHandler (placeName) {
//     this.props.onAddPlace(placeName);
//   }

//   deletePlaceHandler (key) {
//     this.props.onDeletePlace(key);
//   }

//   selectPlaceHandler (key) {
//     this.props.onSelectPlace(key);
//   }

//   deselectPlaceHandler () {
//     this.props.onDeselectPlace();
//   }

//   render () {
//     return (
//       <View style={styles.container}>
//         <PlaceDetail
//           onCloseModal={() => this.deselectPlaceHandler()}
//           onDeleteItem={(key) => this.deletePlaceHandler(key)}
//           selectedPlace={this.props.selectedPlace}
//         />
//         <PlaceInput
//           onSubmitPlace={(placeName) => this.addPlaceHandler(placeName)}
//         />
//         <PlaceList
//           handlePressItem={(key) => this.selectPlaceHandler(key)}
//           places={this.props.places}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     flex: 1,
//     justifyContent: 'flex-start',
//     padding: 20
//   }
// });

// const mapStateToProps = state => {
//   return {
//     places: state.places.places,
//     selectedPlace: state.places.selectedPlace
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: (placeName) => dispatch(addPlace(placeName)),
//     onDeletePlace: (key) => dispatch(deletePlace(key)),
//     onSelectPlace: (key) => dispatch(selectPlace(key)),
//     onDeselectPlace: () => dispatch(deselectPlace())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
