const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_BY_ID_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        userById: false,
      };
    case 'USER_BY_ID_SUCCESS':
      return {
        ...state,
        isLoading: true,
        userById: action.userById,
      };
    case 'USER_BY_ID_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
