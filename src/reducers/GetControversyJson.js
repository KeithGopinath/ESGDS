const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTROVERSY_JSON_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        controversyJson: false,
      };
    case 'GET_CONTROVERSY_JSON_SUCCESS':
      return {
        ...state,
        isLoading: false,
        controversyJson: action.controversyJson,
      };
    case 'GET_CONTROVERSY_JSON_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
