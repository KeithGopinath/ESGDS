export const getRoleAssignmentRequest = () => ({
  type: 'GET_ROLE_ASSIGNMENT_REQUEST',
});

export const getRoleAssignmentSuccess = (roleAssignment) => ({
  type: 'GET_ROLE_ASSIGNMENT_SUCCESS',
  roleAssignment,
});

export const getRoleAssignmentFailure = (error) => ({
  type: 'GET_ROLE_ASSIGNMENT_FAILURE',
  error,
});
