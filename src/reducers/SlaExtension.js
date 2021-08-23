const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SLA_EXTENSION_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        slapost: false,
      };
    case 'SLA_EXTENSION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        slapost: action.slaResponse,
      };
    case 'SLA_EXTENSION_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
