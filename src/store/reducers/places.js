import { ADD_PLACE, DELETE_PLACE } from '../actions';
import { makeId } from '../../utils/utils';
// import placeImage from '../../assets/beautiful-place.jpg';

const initialState = {
  places: []
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: makeId(),
          name: action.placeName,
          // image: placeImage
          image: {
            uri: 'https://i.imgur.com/0uJptVU.jpg'
          }
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
