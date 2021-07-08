const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ONBOARD_REQUEST':
      return {
        ...state,
        isLoading: true,
        onboard: false,
        error: false,
      };
    case 'ONBOARD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        onboard: action.onboard,
      };
    case 'ONBOARD_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
