const initialState = { isLoading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUBSET_TAXONOMY_DOWNLOAD_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        subsetTaxonomy: false,
      };
    case 'SUBSET_TAXONOMY_DOWNLOAD_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        subsetTaxonomy: action.subsetTaxonomyData,
      };
    case 'SUBSET_TAXONOMY_DOWNLOAD_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        subsetTaxonomy: false,
      };
    default:
      return state;
  }
};
