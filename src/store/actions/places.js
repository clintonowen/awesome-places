/* global fetch alert */

import { getAuthToken } from '../actions';

const API_ID = 'awesome-places-1556844574569';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const fetchRequest = () => {
  return {
    type: FETCH_REQUEST
  };
};

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  };
};

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => {
  return {
    type: FETCH_ERROR,
    error
  };
};

export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';
export const getPlacesSuccess = places => {
  return {
    type: GET_PLACES_SUCCESS,
    places
  };
};

export const REMOVE_PLACE = 'REMOVE_PLACE';
export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key
  };
};

export const getPlaces = () => dispatch => {
  dispatch(fetchRequest());
  dispatch(getAuthToken())
    .catch((err) => {
      alert('No valid token found!');
      return dispatch(fetchError(err));
    })
    .then(token => {
      return fetch(`https://${API_ID}.firebaseio.com/places.json?auth=${token}`);
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const places = [];
      for (let key in data) {
        places.push({
          ...data[key],
          image: {
            uri: data[key].image
          },
          key
        });
      }
      return dispatch(getPlacesSuccess(places));
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong, please try again!');
      return dispatch(fetchError(err));
    });
};

export const addPlace = (placeName, location, image) => dispatch => {
  dispatch(fetchRequest());
  return fetch(`https://us-central1-${API_ID}.cloudfunctions.net/storeImage`, {
    method: 'POST',
    body: JSON.stringify({
      image: image.base64
    })
  })
    .then(res => res.json())
    .then(imgData => {
      const placeData = {
        name: placeName,
        location,
        image: imgData.imageUrl
      };
      return fetch(`https://${API_ID}.firebaseio.com/places.json`, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          dispatch(fetchSuccess());
          dispatch(getPlaces());
        })
        .catch(err => {
          console.log(err);
          alert('Something went wrong, please try again!');
          return dispatch(fetchError(err));
        });
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong, please try again!');
      return dispatch(fetchError(err));
    });
};

export const deletePlace = (key) => dispatch => {
  dispatch(fetchRequest());
  dispatch(getAuthToken())
    .catch((err) => {
      alert('No valid token found!');
      return dispatch(fetchError(err));
    })
    .then(token => {
      dispatch(removePlace(key));
      return fetch(`https://${API_ID}.firebaseio.com/places/${key}.json?auth=${token}`, {
        method: 'DELETE'
      });
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      return dispatch(fetchSuccess());
    })
    .catch(err => {
      console.log(err);
      alert('Something went wrong, please try again!');
      return dispatch(fetchError(err));
    });
};
