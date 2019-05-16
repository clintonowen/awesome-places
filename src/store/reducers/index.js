import { combineReducers } from 'redux';
import placesReducer from './places';
import authReducer from './auth';

const combinedReducers = combineReducers({
  places: placesReducer,
  auth: authReducer
});

export default combinedReducers;
