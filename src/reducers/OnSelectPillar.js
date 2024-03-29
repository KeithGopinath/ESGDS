const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ONSELECTPILLAR_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        pillarTask: false,
      };
    case 'ONSELECTPILLAR_SUCCESS':
      return {
        ...state,
        isLoading: false,
        pillarTask: action.pillar,
      };
    case 'ONSELECTPILLAR_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        pillarTask: false,
      };
    case 'ONSELECTPILLAR_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
