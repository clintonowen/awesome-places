import { Navigation } from 'react-native-navigation';
import { loadAuthScreen } from './src/navigation';

Navigation.events().registerAppLaunchedListener(() => loadAuthScreen());
