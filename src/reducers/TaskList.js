const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TASKLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        data: false,
      };
    case 'GET_TASKLIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.tasklist,
      };
    case 'GET_TASKLIST_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        data: false,
      };
    case 'GET_TASKLIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
