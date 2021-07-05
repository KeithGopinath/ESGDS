export const getRoleAssignmentSuccess = (getRoleAssignment) => ({
  type: 'ROLE_ASSIGNMENT_SUCCESS',
  getRoleAssignment,
});

export const getRoleAssignmentFailure = (error) => ({
  type: 'ROLE_ASSIGNMENT_FAILURE',
  error,
});
