const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REJECTSLA_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        rejectsladata: false,
      };
    case 'REJECTSLA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        rejectsladata: action.rejected,
      };
    case 'REJECTSLA_RESET':
      return {
        ...state,
        isLoading: false,
        rejectsladata: false,
        error: false,
      };
    case 'REJECTSLA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
