const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROLE_ASSIGNMENT_EDIT_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        roleAssignmentEdit: false,
      };
    case 'ROLE_ASSIGNMENT_EDIT_SUCCESS':
      return {
        ...state,
        isLoading: true,
        roleAssignmentEdit: action.roleAssignmentEdit,
      };
    case 'ROLE_ASSIGNMENT_EDIT_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
