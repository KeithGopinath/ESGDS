const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROLES_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_ROLES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        roles: action.roles,
      };
    case 'GET_ROLES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
