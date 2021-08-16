const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TASK_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        taskpost: false,
      };
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        isLoading: false,
        taskpost: action.taskresponse,
      };
    case 'CREATE_TASK_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        taskpost: false,
      };
    case 'CREATE_TASK_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
