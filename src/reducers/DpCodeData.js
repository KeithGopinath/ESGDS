const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DPCODEDATA_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        dpCodeData: false,
      };
    case 'DPCODEDATA_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dpCodeData: action.dpCodeData,
      };
    case 'DPCODEDATA_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        dpCodeData: false,
      };
    default:
      return state;
  }
};
