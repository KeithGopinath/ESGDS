import * as CLIENT from './../actionTypes/Client';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLIENT.CLIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        client: false,
        error: false,
      };
    case CLIENT.CLIENT_SUCCESS:
      return {
        ...state,
        isLoading: true,
        client: action.client,
      };
    case CLIENT.CLIENT_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
