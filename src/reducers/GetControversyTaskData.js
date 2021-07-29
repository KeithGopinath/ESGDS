const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONTROVERSY_TASK_DATA_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        controversyTaskData: false,
      };
    case 'CONTROVERSY_TASK_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        controversyTaskData: action.controversyTaskData,
      };
    case 'CONTROVERSY_TASK_DATA_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
