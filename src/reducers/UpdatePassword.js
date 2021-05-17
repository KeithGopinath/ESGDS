import * as ESGDS from './../actionTypes/UpdatePassword';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        updatePassword: false,
      };
    case ESGDS.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatePassword: action.updatePassword,
      };
    case ESGDS.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
