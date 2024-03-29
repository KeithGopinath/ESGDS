const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REPORTS_TASKLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        reportsTaskList: false,
      };
    case 'GET_REPORTS_TASKLIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        reportsTaskList: action.reportsTaskList,
      };
    case 'GET_REPORTS_TASKLIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
