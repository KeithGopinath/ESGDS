const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MASTER_TAXONOMY_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        masterTaxonomy: false,
      };
    case 'MASTER_TAXONOMY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        masterTaxonomy: action.masterTaxonomy,
      };
    case 'MASTER_TAXONOMY_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
