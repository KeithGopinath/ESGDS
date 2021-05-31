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
        isLoading: true,
        onboard: action.onboard,
      };
    case 'ONBOARD_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
