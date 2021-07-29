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
        isLoading: true,
        unassignedbatchdata: action.unassignedbatchlist,
      };
    case 'UNASSIGNEDBATCH_RESET':
      return {
        ...state,
        isLoading: true,
        error: false,
        unassignedbatchdata: false,
      };
    case 'UNASSIGNEDBATCH_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
