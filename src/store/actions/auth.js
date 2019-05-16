/* global fetch alert */

import { startMainTabs } from '../../navigation';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => {
  return {
    type: AUTH_REQUEST
  };
};

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token
  };
};

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    error
  };
};

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => {
  return {
    type: CLEAR_AUTH
  };
};

export const login = (authData) => (dispatch) => {
  const endpoint = 'verifyPassword';
  const errMsg = 'Authentication';
  dispatch(tryAuth(authData, endpoint, errMsg));
};

export const signup = (authData) => (dispatch) => {
  const endpoint = 'signupNewUser';
  const errMsg = 'Signup';
  dispatch(tryAuth(authData, endpoint, errMsg));
};

export const tryAuth = (authData, endpoint, errMsg) => (dispatch) => {
  dispatch(authRequest());
  const { email, password } = authData;
  fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${endpoint}?key=AIzaSyBRmBVFwUccMZNqTH6OIFB4etRKqDGJVm0`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      if (!parsedRes.idToken) {
        if (parsedRes.error) {
          dispatch(authError(parsedRes.error));
        } else {
          dispatch(authError(new Error(`${errMsg} failed.`)));
        }
        alert(`${errMsg} failed. Please try again.`);
      } else {
        dispatch(authSuccess(parsedRes.idToken));
        startMainTabs();
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(authError(err));
      alert(`${errMsg} failed. Please try again.`);
    });
};

export const getAuthToken = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const token = getState().auth.authToken;
    if (!token) {
      reject(new Error('No authToken found.'));
    } else {
      resolve(token);
    }
  });
};
