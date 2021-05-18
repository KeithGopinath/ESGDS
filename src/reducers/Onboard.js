import * as ESGDS from '../actionTypes/Client';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.ONBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        onboard: false,
        error: false,
      };
    case ESGDS.ONBOARD_SUCCESS:
      return {
        ...state,
        isLoading: true,
        onboard: action.onboard,
      };
    case ESGDS.ONBOARD_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
