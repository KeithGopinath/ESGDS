const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PENDING_TASKS_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        pendingTasksList: false,
      };
    case 'PENDING_TASKS_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        pendingTasksList: action.pendingTasksList,
      };
    case 'PENDING_TASKS_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
