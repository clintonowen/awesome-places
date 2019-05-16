/* global fetch alert */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    error
  };
};

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST
  };
};

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS
  };
};

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const signupError = (error) => {
  return {
    type: SIGNUP_ERROR,
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
  dispatch(loginRequest());
  const { email, password } = authData;
  fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBRmBVFwUccMZNqTH6OIFB4etRKqDGJVm0', {
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
      dispatch(loginSuccess());
    })
    .catch(err => {
      console.log(err);
      dispatch(loginError(err));
      alert('Authentication failed. Please try again.');
    });
};

export const signup = (authData) => (dispatch) => {
  dispatch(signupRequest());
  const { email, password } = authData;
  fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBRmBVFwUccMZNqTH6OIFB4etRKqDGJVm0', {
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
      dispatch(signupSuccess());
    })
    .catch(err => {
      console.log(err);
      dispatch(signupError(err));
      alert('Signup failed. Please try again.');
    });
};
