import { Navigation } from 'react-native-navigation';

const startTabs = () => {
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
                  icon: require('../../assets/search.png')
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
                  icon: require('../../assets/search.png')
                }
              }
            }
          }
        ]
      }
    }
  });
};

export default startTabs;
