const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROLES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        roles: false,
      };
    case 'GET_ROLES_SUCCESS':
      return {
        ...state,
        isLoading: true,
        roles: action.roles,
      };
    case 'GET_ROLES_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
