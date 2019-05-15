import {
  CLEAR_AUTH,
  FETCH_REQUEST,
  FETCH_ERROR,
  GET_PLACES_SUCCESS,
  ADD_PLACE_SUCCESS,
} from '../actions';

const initialState = {
  error: null,
  isLoading: false,
  places: []
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH:
      return { ...initialState };
    case FETCH_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
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
        places: action.places
      };
    case ADD_PLACE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };
    // case DELETE_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.filter(place => place.key !== action.key)
    //   };
    default:
      return state;
  }
};

export default placesReducer;
