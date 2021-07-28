const initialState = {};

export const dpCodeData = (state = initialState, action) => {
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
    case 'CONTROVERSY_DPCODEDATA_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        dpCodeData: false,
      };
    case 'CONTROVERSY_DPCODEDATA_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dpCodeData: action.controversyDpCodeData,
      };
    case 'CONTROVERSY_DPCODEDATA_GET_FAILURE':
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

export const dpCodeDataCreate = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTROVERSY_DPCODEDATA_POST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        dpCodeData: false,
      };
    case 'CONTROVERSY_DPCODEDATA_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dpCodeData: action.controversyDpCodeData,
      };
    case 'CONTROVERSY_DPCODEDATA_POST_FAILURE':
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

export const dpCodeDataEdit = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTROVERSY_DPCODEDATA_UPDATE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        dpCodeData: false,
      };
    case 'CONTROVERSY_DPCODEDATA_UPDATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dpCodeData: action.controversyDpCodeData,
      };
    case 'CONTROVERSY_DPCODEDATA_UPDATE_FAILURE':
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
