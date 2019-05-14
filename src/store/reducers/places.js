import { ADD_PLACE, DELETE_PLACE, CLEAR_AUTH } from '../actions';
import { makeId } from '../../utils/utils';
// import placeImage from '../../assets/beautiful-place.jpg';

const initialState = {
  places: []
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH:
      return { ...initialState };
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: makeId(),
          name: action.placeName,
          // image: placeImage
          image: {
            uri: action.image.uri
          },
          location: action.location
        })
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
