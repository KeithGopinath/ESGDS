const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DERIVED_CALCULATION_POST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        calculation: false,
      };
    case 'DERIVED_CALCULATION_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        calculation: action.calculation,
      };
    case 'DERIVED_CALCULATION_POST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
