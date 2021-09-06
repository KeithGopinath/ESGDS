const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DPCODE_VALIDATION_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        validation: false,
      };
    case 'DPCODE_VALIDATION_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        validation: action.validation,
      };
    case 'DPCODE_VALIDATION_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
