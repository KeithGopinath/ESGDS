const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BATCH_CREATE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        batchpost: false,
      };
    case 'BATCH_CREATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        batchpost: action.createbatch,
      };
    case 'BATCH_CREATE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'BATCH_CREATE_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
      };
    default:
      return state;
  }
};
