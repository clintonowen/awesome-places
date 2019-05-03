export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = (authData) => {
  return {
    type: AUTH_REQUEST,
    authData
  };
};

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => {
  return {
    type: CLEAR_AUTH
  };
};
