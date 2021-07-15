const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TASKDETAILS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        taskdata: false,
      };
    case 'TASKDETAILS_SUCCESS':
      return {
        ...state,
        isLoading: true,
        taskdata: action.tasklist,
      };
    case 'TASKDETAILS_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
