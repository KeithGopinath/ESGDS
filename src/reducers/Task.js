const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TASK_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
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
      };
    default:
      return state;
  }
};
