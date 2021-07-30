const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CONTROVERSY_TASK_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        createControversyTask: false,
      };
    case 'CREATE_CONTROVERSY_TASK_SUCCESS':
      return {
        ...state,
        isLoading: false,
        createControversyTask: action.createControversyTask,
      };
    case 'CREATE_CONTROVERSY_TASK_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
