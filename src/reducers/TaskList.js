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
        isLoading: true,
        data: action.tasklist,
      };
    case 'GET_TASKLIST_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
