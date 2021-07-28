const initialState = { isLoading: false };

export const sourceType = (state = initialState, action) => {
  switch (action.type) {
    case 'SOURCE_TYPE_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        source: false,
      };
    case 'SOURCE_TYPE_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        source: action.sourceTypeGetDetails,
      };
    case 'SOURCE_TYPE_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const sourceTypeCreate = (state = initialState, action) => {
  switch (action.type) {
    case 'SOURCE_TYPE_POST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        source: false,
      };
    case 'SOURCE_TYPE_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        source: action.sourceTypePostDetails,
      };
    case 'SOURCE_TYPE_POST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
