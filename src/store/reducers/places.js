import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  GET_PLACES_SUCCESS,
  REMOVE_PLACE,
  CLEAR_AUTH
} from '../actions';

const initialState = {
  error: null,
  isLoading: false,
  places: []
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case GET_PLACES_SUCCESS:
      return {
        ...state,
        places: action.places,
        error: null,
        isLoading: false
      };
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.key),
        error: null,
        isLoading: false
      };
    case CLEAR_AUTH:
      return { ...initialState };
    default:
      return state;
  }
};

export default placesReducer;
