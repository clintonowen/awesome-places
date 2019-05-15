/* global fetch alert */

const API_BASE_URL = 'https://awesome-places-1556844574569-57303.firebaseio.com';
const API_FUNC_URL = 'https://us-central1-awesome-places-1556844574569.cloudfunctions.net';

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
  return fetch(`${API_BASE_URL}/places.json`)
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
  return fetch(`${API_FUNC_URL}/storeImage`, {
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
      return fetch(`${API_BASE_URL}/places.json`, {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          return dispatch(fetchSuccess());
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
  dispatch(removePlace(key));
  dispatch(fetchRequest());
  return fetch(`${API_BASE_URL}/places/${key}.json`, {
    method: 'DELETE'
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
