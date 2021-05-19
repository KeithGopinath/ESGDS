import { KEYISSUES_REQUEST, KEYISSUES_SUCCESS, KEYISSUES_FAILURE } from './../actionTypes/KeyIssues';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case KEYISSUES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        keyIssuesList: false,
      };
    case KEYISSUES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        keyIssuesList: action.keyIssueList,
      };
    case KEYISSUES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
