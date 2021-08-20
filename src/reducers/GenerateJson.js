const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GENERATE_JSON_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        generateJson: false,
      };
    case 'GENERATE_JSON_SUCCESS':
      return {
        ...state,
        isLoading: false,
        generateJson: action.generateJson,
      };
    case 'GENERATE_JSON_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GENERATE_JSON_RESET':
      return {
        ...state,
        isLoading: true,
        error: false,
        generateJson: false,
      };
    default:
      return state;
  }
};
