const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PILLARTAXANOMY_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        pillardata: false,
      };
    case 'PILLARTAXANOMY_SUCCESS':
      return {
        ...state,
        isLoading: true,
        pillardata: action.pillarlist,
      };
    case 'PILLARTAXANOMY_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
