import { KEYISSUES_REQUEST, KEYISSUES_SUCCESS, KEYISSUES_FAILURE } from './../actionTypes/KeyIssues';

export const getKeyIssuesRequest = () => ({
  type: KEYISSUES_REQUEST,
});

export function getKeyIssuesSuccess(keyIssueList) {
  return {
    type: KEYISSUES_SUCCESS,
    keyIssueList,
  };
}

export function getKeyIssuesFailure(error) {
  return {
    type: KEYISSUES_FAILURE,
    error,
  };
}
