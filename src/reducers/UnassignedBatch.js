const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UNASSIGNEDBATCH_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        unassignedbatchdata: false,
      };
    case 'UNASSIGNEDBATCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        unassignedbatchdata: action.unassignedbatchlist,
      };
    case 'UNASSIGNEDBATCH_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        unassignedbatchdata: false,
      };
    case 'UNASSIGNEDBATCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
