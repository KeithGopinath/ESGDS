// ADD NEW BOARD || KMP MEMBER
export const addNewMemberPostRequest = () => ({
  type: 'ADD_NEW_MEMBER_POST_REQUEST',
});

export const addNewMemberPostSuccess = (newMember) => ({
  type: 'ADD_NEW_MEMBER_POST_SUCCESS',
  newMember,
});

export const addNewMemberPostFailure = (error) => ({
  type: 'ADD_NEW_MEMBER_POST_FAILURE',
  error,
});

// GET ACTIVE BOARD || KMP MEMBER
export const activeMembersPostRequest = () => ({
  type: 'ACTIVE_MEMBERS_GET_REQUEST',
});

export const activeMembersPostSuccess = (activeMembers) => ({
  type: 'ACTIVE_MEMBERS_GET_SUCCESS',
  activeMembers,
});

export const activeMembersPostFailure = (error) => ({
  type: 'ACTIVE_MEMBERS_GET_FAILURE',
  error,
});

// TERMINATE KMP || BOARD MEMBER
export const terminateMembersPostRequest = () => ({
  type: 'TERMINATE_MEMBERS_POST_REQUEST',
});

export const terminateMembersPostSuccess = (terminateMembers) => ({
  type: 'TERMINATE_MEMBERS_POST_SUCCESS',
  terminateMembers,
});

export const terminateMembersPostFailure = (error) => ({
  type: 'TERMINATE_MEMBERS_POST_FAILURE',
  error,
});
