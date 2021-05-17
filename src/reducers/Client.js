import * as ESGDS from './../actionTypes/Client';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.CLIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        client: false,
        error: false,
      };
    case ESGDS.CLIENT_SUCCESS:
      return {
        ...state,
        isLoading: true,
        client: action.client,
      };
    case ESGDS.CLIENT_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
