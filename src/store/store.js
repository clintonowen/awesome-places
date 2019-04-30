import { createStore, combineReducers } from 'redux';
import placesReducer from './reducers/places';

const store = createStore(
  combineReducers({
    places: placesReducer
  })
);

export default store;
