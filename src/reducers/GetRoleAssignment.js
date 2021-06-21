const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROLE_ASSIGNMENT_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        roleAssignment: false,
      };
    case 'GET_ROLE_ASSIGNMENT_SUCCESS':
      return {
        ...state,
        isLoading: true,
        roleAssignment: action.roleAssignment,
      };
    case 'GET_ROLE_ASSIGNMENT_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
