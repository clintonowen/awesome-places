import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CLEAR_AUTH
} from '../actions';

const initialState = {
  error: null,
  isLoading: false,
  authToken: null,
  expiryDate: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
        authToken: null,
        expiryDate: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        authToken: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        authToken: null,
        expiryDate: null
      };
    case CLEAR_AUTH:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
