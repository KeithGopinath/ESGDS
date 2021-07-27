const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TASK_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        task: false,
      };
    case 'TASK_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        task: action.task,
      };
    case 'TASK_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        task: false,
      };
    case 'CONTROVERSY_TASK_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        task: false,
      };
    case 'CONTROVERSY_TASK_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        task: action.task,
      };
    case 'CONTROVERSY_TASK_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        task: false,
      };
    default:
      return state;
  }
};
