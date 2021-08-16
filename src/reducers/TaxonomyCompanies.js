const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TAXANOMYCOMPANY_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        taxonomycompany: false,
      };
    case 'TAXANOMYCOMPANY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        taxonomycompany: action.taxcompany,
      };
    case 'TAXANOMYCOMPANY_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        taxonomycompany: false,
      };
    case 'TAXANOMYCOMPANY_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
