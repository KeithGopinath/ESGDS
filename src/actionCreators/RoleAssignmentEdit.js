export const roleAssignmentEditRequest = (payload) => ({
  type: 'ROLE_ASSIGNMENT_EDIT_REQUEST',
  payload,
});

export const roleAssignmentEditSuccess = (roleAssignmentEdit) => ({
  type: 'ROLE_ASSIGNMENT_EDIT_SUCCESS',
  roleAssignmentEdit,
});

export const roleAssignmentEditFailure = (error) => ({
  type: 'ROLE_ASSIGNMENT_EDIT_FAILURE',
  error,
});
