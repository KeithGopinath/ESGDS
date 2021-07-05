const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROLE_ASSIGNMENT_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        getRoleAssignment: false,
      };
    case 'ROLE_ASSIGNMENT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        getRoleAssignment: action.getRoleAssignment,
      };
    case 'ROLE_ASSIGNMENT_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
