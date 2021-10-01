const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RAISEDSLA_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        raisedsladata: false,
      };
    case 'RAISEDSLA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        raisedsladata: action.raised,
      };
    case 'RAISEDSLA_RESET':
      return {
        ...state,
        isLoading: false,
        raisedsladata: false,
      };
    case 'RAISEDSLA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
