const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BATCH_CREATE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        batchdata: false,
      };
    case 'BATCH_CREATE_SUCCESS':
      return {
        ...state,
        isLoading: true,
        batchpost: action.createbatch,
      };
    case 'BATCH_CREATE_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
