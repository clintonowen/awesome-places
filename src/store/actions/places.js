export const ADD_PLACE = 'ADD_PLACE';
export const addPlace = (placeName, location, image) => {
  return {
    type: ADD_PLACE,
    placeName,
    location,
    image
  };
};

export const DELETE_PLACE = 'DELETE_PLACE';
export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    key
  };
};
