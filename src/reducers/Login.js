import * as ESGDS from './../actionTypes/Login';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ESGDS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: true,
        login: action.login,
      };
    case ESGDS.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
