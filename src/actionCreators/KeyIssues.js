export const getKeyIssuesRequest = () => ({
  type: 'KEYISSUES_REQUEST',
});

export const getKeyIssuesSuccess = (keyIssueList) => ({
  type: 'KEYISSUES_SUCCESS',
  keyIssueList,
});

export const getKeyIssuesFailure = (error) => ({
  type: 'KEYISSUES_FAILURE',
  error,
});
