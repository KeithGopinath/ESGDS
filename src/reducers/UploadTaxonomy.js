const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_TAXONOMY_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        uploadTaxonomy: false,
      };
    case 'UPLOAD_TAXONOMY_SUCCESS':
      return {
        ...state,
        isLoading: true,
        uploadTaxonomy: action.uploadTaxonomy,
      };
    case 'UPLOAD_TAXONOMY_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
