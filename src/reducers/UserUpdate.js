const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        userUpdate: false,
      };
    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        userUpdate: action.userUpdate,
      };
    case 'USER_UPDATE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
