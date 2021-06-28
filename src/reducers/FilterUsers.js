const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_USERS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        filterUsers: false,
      };
    case 'FILTER_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        filterUsers: action.filterUsers,
      };
    case 'FILTER_USERS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
