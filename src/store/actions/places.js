export const ADD_PLACE = 'ADD_PLACE';
export const addPlace = (placeName, location) => {
  return {
    type: ADD_PLACE,
    placeName,
    location
  };
};

export const DELETE_PLACE = 'DELETE_PLACE';
export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    key
  };
};
