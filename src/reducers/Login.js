const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        login: false,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        login: action.login,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
