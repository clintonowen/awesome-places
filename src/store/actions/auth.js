/* global fetch alert */

import AsyncStorage from '@react-native-community/async-storage';
import { startMainTabs } from '../../navigation';

const API_KEY = 'AIzaSyBRmBVFwUccMZNqTH6OIFB4etRKqDGJVm0';

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
  fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${endpoint}?key=${API_KEY}`, {
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
        dispatch(storeAuthToken(
          parsedRes.idToken,
          parsedRes.expiresIn,
          parsedRes.refreshToken
        ));
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
  const promise = new Promise((resolve, reject) => {
    let token = getState().auth.authToken;
    if (!token) {
      AsyncStorage.getItem('ap:auth:token')
        .then(tokenFromStorage => {
          if (!tokenFromStorage) {
            throw new Error('No authToken found.');
          }
          token = tokenFromStorage;
          return AsyncStorage.getItem('ap:auth:expiryDate');
        })
        .then(expiryDate => {
          const parsedExpiry = new Date(parseInt(expiryDate));
          const now = new Date();
          if (parsedExpiry > now) {
            dispatch(authSuccess(token));
            resolve(token);
          } else {
            throw new Error('authToken is expired.');
          }
        })
        .catch(err => {
          reject(err);
        });
    } else {
      resolve(token);
    }
  });
  return promise
    .catch(() => {
      return AsyncStorage.getItem('ap:auth:refreshToken')
        .then(refreshToken => {
          if (!refreshToken) {
            throw new Error('No refreshToken found.');
          }
          return fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .then(parsedRes => {
          console.log(parsedRes);
          if (parsedRes.id_token) {
            dispatch(storeAuthToken(
              parsedRes.id_token,
              parsedRes.expires_in,
              parsedRes.refresh_token
            ));
            return parsedRes.id_token;
          } else {
            dispatch(clearAuthStorage());
          }
        })
        .catch(() => {
          dispatch(clearAuthStorage());
        });
    })
    .then(token => {
      if (!token) {
        throw new Error('Unable to refresh authToken');
      } else {
        return token;
      }
    });
};

export const storeAuthToken = (token, expiresIn, refreshToken) => dispatch => {
  dispatch(authSuccess(token));
  const now = new Date();
  const expiryDate = (now.getTime() + expiresIn * 1000).toString();
  AsyncStorage.setItem('ap:auth:token', token);
  AsyncStorage.setItem('ap:auth:expiryDate', expiryDate);
  AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
};

export const tryAutoSignIn = () => dispatch => {
  dispatch(getAuthToken())
    .then(token => {
      console.log('Found a token! Signing in.');
      startMainTabs();
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const clearAuthStorage = () => {
  AsyncStorage.removeItem('ap:auth:token');
  AsyncStorage.removeItem('ap:auth:expiryDate');
};
