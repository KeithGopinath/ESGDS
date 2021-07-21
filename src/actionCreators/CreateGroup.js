export const CreateGroupRequest = (grpinfo) => ({
  type: 'GROUP_CREATE_REQUEST',
  grpinfo,
});

export const CreateGroupSuccess = (creategroup) => ({
  type: 'GROUP_CREATE_SUCCESS',
  creategroup,
});

export const CreateGroupFailure = (error) => ({
  type: 'GROUP_CREATE_FAILURE',
  error,
});
