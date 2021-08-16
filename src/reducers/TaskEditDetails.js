const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TASKEDITDETAILS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        taskeditData: false,
      };
    case 'TASKEDITDETAILS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        taskeditData: action.taskedit,
      };
    case 'TASKEDITDETAILS_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        taskeditData: false,
      };
    case 'TASKEDITDETAILS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
