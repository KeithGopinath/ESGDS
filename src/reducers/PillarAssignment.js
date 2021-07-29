const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PILLARASSIGN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        pillarAssign: false,
      };
    case 'PILLARASSIGN_SUCCESS':
      return {
        ...state,
        isLoading: true,
        pillarAssign: action.assignpillar,
      };
    case 'PILLARASSIGN_RESET':
      return {
        ...state,
        isLoading: true,
        error: false,
        pillarAssign: false,
      };
    case 'PILLARASSIGN_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
