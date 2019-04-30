import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../store/store';
import { AuthScreen, FindPlaceScreen, SharePlaceScreen } from '../screens';
import { AUTH_SCREEN, SHARE_PLACE_SCREEN, FIND_PLACE_SCREEN } from './Screens';

function WrappedComponent (Component) {
  return function inject (props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component
          {...props}
        />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(
    AUTH_SCREEN,
    () => WrappedComponent(AuthScreen)
  );
  Navigation.registerComponent(
    FIND_PLACE_SCREEN,
    () => WrappedComponent(FindPlaceScreen)
  );
  Navigation.registerComponent(
    SHARE_PLACE_SCREEN,
    () => WrappedComponent(SharePlaceScreen)
  );
  // console.info('All screens have been registered...');
}
