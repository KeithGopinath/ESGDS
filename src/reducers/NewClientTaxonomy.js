const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_CLIENT_TAXONOMY_REQUEST':
      return {
        ...state,
        isLoading: true,
        newClientTaxonomy: false,
        error: false,
      };
    case 'NEW_CLIENT_TAXONOMY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        newClientTaxonomy: action.newClientTaxonomy,
      };
    case 'NEW_CLIENT_TAXONOMY_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
