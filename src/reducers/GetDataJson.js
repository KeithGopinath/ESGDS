const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA_JSON_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        dataJson: false,
      };
    case 'GET_DATA_JSON_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataJson: action.dataJson,
      };
    case 'GET_DATA_JSON_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
