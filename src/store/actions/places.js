/* global fetch */

const API_BASE_URL = 'https://awesome-places-1556844574569-57303.firebaseio.com';

export const ADD_PLACE_REQUEST = 'ADD_PLACE_REQUEST';
export const addPlaceRequest = () => {
  return {
    type: ADD_PLACE_REQUEST
  };
};

export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const addPlaceSuccess = data => {
  return {
    type: ADD_PLACE_SUCCESS,
    data
  };
};

export const ADD_PLACE_ERROR = 'ADD_PLACE_ERROR';
export const addPlaceError = error => {
  return {
    type: ADD_PLACE_ERROR,
    error
  };
};

export const DELETE_PLACE = 'DELETE_PLACE';
export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    key
  };
};

export const addPlace = (placeName, location, image) => dispatch => {
  // dispatch(addPlaceRequest());
  const placeData = {
    name: placeName,
    location
  };
  return fetch(`${API_BASE_URL}/places.json`, {
    method: 'POST',
    body: JSON.stringify(placeData)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // return dispatch(addPlaceSuccess(data));
    })
    .catch(err => {
      console.log(err);
      // return dispatch(addPlaceError(err));
    });
};
