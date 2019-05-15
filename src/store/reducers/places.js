import {
  ADD_PLACE_REQUEST,
  ADD_PLACE_SUCCESS,
  ADD_PLACE_ERROR,
  DELETE_PLACE,
  CLEAR_AUTH
} from '../actions';
import { makeId } from '../../utils/utils';
// import placeImage from '../../assets/beautiful-place.jpg';

const initialState = {
  error: null,
  loading: false,
  places: []
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH:
      return { ...initialState };
    case ADD_PLACE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ADD_PLACE_SUCCESS:
      const { name, location } = action.data;
      return {
        ...state,
        places: state.places.concat({
          key: makeId(),
          name,
          // image: placeImage
          // image: {
          //   uri: action.image.uri
          // },
          location
        }),
        error: null,
        loading: false
      };
    case ADD_PLACE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.key)
      };
    default:
      return state;
  }
};

export default placesReducer;
