export const ADD_PLACE = 'ADD_PLACE';
export const addPlace = (placeName) => {
  return {
    type: ADD_PLACE,
    placeName
  };
};

export const DELETE_PLACE = 'DELETE_PLACE';
export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    key
  };
};

export const SELECT_PLACE = 'SELECT_PLACE';
export const selectPlace = (key) => {
  return {
    type: SELECT_PLACE,
    key
  };
};

export const DESELECT_PLACE = 'DESELECT_PLACE';
export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  };
};
