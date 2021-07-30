export const getGroupListRequest = () => ({
  type: 'GROUPLIST_REQUEST',
});

export const getGroupListSuccess = (getgrouplist) => ({
  type: 'GROUPLIST_SUCCESS',
  getgrouplist,
});

export const getGroupListFailure = (error) => ({
  type: 'GROUPLIST_FAILURE',
  error,
});
