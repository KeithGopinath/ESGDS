const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GETTASKLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        data: false,
      };
    case 'GETTASKLIST_SUCCESS':
      return {
        ...state,
        isLoading: true,
        data: action.tasklist,
      };
    case 'GETTASKLIST_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
