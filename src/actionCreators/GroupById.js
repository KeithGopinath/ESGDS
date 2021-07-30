export const getGroupByIdRequest = (groupid) => ({
  type: 'GROUPBYID_REQUEST',
  groupid,
});

export const getGroupByIdSuccess = (getgroupbyid) => ({
  type: 'GROUPBYID_SUCCESS',
  getgroupbyid,
});

export const getGroupByIdFailure = (error) => ({
  type: 'GROUPBYID_FAILURE',
  error,
});
