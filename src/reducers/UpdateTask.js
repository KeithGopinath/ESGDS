const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATETASK_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        taskUpdate: false,
      };
    case 'UPDATETASK_SUCCESS':
      return {
        ...state,
        isLoading: false,
        taskUpdate: action.taskupdate,
      };
    case 'UPDATETASK_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
