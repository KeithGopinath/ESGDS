const initialState = {};

export const masterTaxonomy = (state = initialState, action) => {
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

export const masterTaxonomyHeader = (state = initialState, action) => {
  switch (action.type) {
    case 'MASTER_TAXONOMY_HEADER_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        masterTaxonomyHeader: false,
      };
    case 'MASTER_TAXONOMY_HEADER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        masterTaxonomyHeader: action.column,
      };
    case 'MASTER_TAXONOMY_HEADER_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
