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
        isLoading: true,
        taxonomycompany: action.taxcompany,
      };
    case 'TAXANOMYCOMPANY_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
