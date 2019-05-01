import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AUTH_SCREEN,
  FIND_PLACE_SCREEN,
  SHARE_PLACE_SCREEN,
  SIDE_DRAWER
} from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function loadAuthScreen () {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#039893'
      },
      title: {
        color: 'white'
      },
      backButton: {
        // title: '', // Remove previous screen name from back button
        color: 'white'
      },
      buttonColor: 'white'
    },
    statusBar: {
      style: 'light'
    },
    // layout: {
    //   orientation: ['portrait']
    // },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow'
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: '#2196F3',
      iconColor: 'gray',
      selectedIconColor: '#2196F3'
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: AUTH_SCREEN,
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
}

export function startMainTabs () {
  Promise.all([
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-map' : 'ios-map',
      30
    ),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt',
      30
    ),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-menu' : 'ios-menu',
      30
    )
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              id: 'leftSideDrawer',
              name: SIDE_DRAWER
            }
          },
          center: {
            bottomTabs: {
              children: [{
                stack: {
                  children: [{
                    component: {
                      name: FIND_PLACE_SCREEN,
                      options: {
                        topBar: {
                          title: {
                            text: 'Find Place'
                          },
                          leftButtons: [
                            {
                              id: 'sideDrawerButton',
                              icon: sources[2],
                              text: 'Menu'
                            }
                          ]
                        }
                      }
                    }
                  }],
                  options: {
                    bottomTab: {
                      icon: sources[0],
                      testID: 'FIND_TAB_BAR_BUTTON',
                      text: 'Find Place'
                    }
                  }
                }
              },
              {
                stack: {
                  children: [{
                    component: {
                      name: SHARE_PLACE_SCREEN,
                      options: {
                        topBar: {
                          title: {
                            text: 'Share Place'
                          },
                          leftButtons: [
                            {
                              id: 'sideDrawerButton',
                              icon: sources[2],
                              text: 'Menu'
                            }
                          ]
                        }
                      }
                    }
                  }],
                  options: {
                    bottomTab: {
                      icon: sources[1],
                      testID: 'SHARE_TAB_BAR_BUTTON',
                      text: 'Share Place'
                    }
                  }
                }
              }]
            }
          }
        }
      }
    });
  });
}
