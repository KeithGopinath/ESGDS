const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONTROVERSY_TASK_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        controversyTaskList: false,
      };
    case 'CONTROVERSY_TASK_LIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        controversyTaskList: action.controversyTaskList,
      };
    case 'CONTROVERSY_TASK_LIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
