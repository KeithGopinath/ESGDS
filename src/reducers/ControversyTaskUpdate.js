const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONTROVERSY_UPDATE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        controversypost: false,
      };
    case 'CONTROVERSY_UPDATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        controversypost: action.update,
      };
    case 'CONTROVERSY_UPDATE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'CONTROVERSY_UPDATE_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    default:
      return state;
  }
};
