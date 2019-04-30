import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-share-alt', 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [{
                  component: {
                    name: 'awesome-places.FindPlaceScreen',
                    options: {
                      topBar: {
                        title: {
                          text: 'Find Place'
                        }
                      }
                    }
                  }
                }],
                options: {
                  bottomTab: {
                    text: 'Find Place',
                    textColor: 'gray',
                    selectedTextColor: '#2196F3',
                    icon: sources[0],
                    iconColor: 'gray',
                    selectedIconColor: '#2196F3'
                  }
                }
              }
            },
            {
              stack: {
                children: [{
                  component: {
                    name: 'awesome-places.SharePlaceScreen',
                    options: {
                      topBar: {
                        title: {
                          text: 'Share Place'
                        }
                      }
                    }
                  }
                }],
                options: {
                  bottomTab: {
                    text: 'Share Place',
                    textColor: 'gray',
                    selectedTextColor: '#2196F3',
                    icon: sources[1],
                    iconColor: 'gray',
                    selectedIconColor: '#2196F3'
                  }
                }
              }
            }
          ]
        }
      }
    });
  });
};

export default startTabs;
