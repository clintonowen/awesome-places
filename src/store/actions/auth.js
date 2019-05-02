export const TRY_AUTH = 'TRY_AUTH';
export const tryAuth = (authData) => {
  return {
    type: TRY_AUTH,
    authData
  };
};
