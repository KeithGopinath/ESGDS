const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ClientTaxonomy_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        taxonomydata: false,
      };
    case 'ClientTaxonomy_SUCCESS':
      return {
        ...state,
        isLoading: false,
        taxonomydata: action.ClientTaxonomy,
      };
    case 'ClientTaxonomy_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
