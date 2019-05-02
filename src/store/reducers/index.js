import { combineReducers } from 'redux';
import placesReducer from './places';

const combinedReducers = combineReducers({
  places: placesReducer
});

export default combinedReducers;
