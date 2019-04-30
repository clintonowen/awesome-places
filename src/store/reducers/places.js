import {
  ADD_PLACE,
  DELETE_PLACE,
  makeId
} from '../actions';
// import placeImage from '../../assets/beautiful-place.jpg';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
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

export default reducer;
