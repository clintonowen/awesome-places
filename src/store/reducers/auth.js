import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CLEAR_AUTH
} from '../actions';

const initialState = {
  error: null,
  isLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH:
      return { ...initialState };
    case AUTH_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
