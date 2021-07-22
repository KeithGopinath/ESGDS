const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_COMPANIES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        uploadCompanies: false,
      };
    case 'UPLOAD_COMPANIES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        uploadCompanies: action.uploadCompanies,
      };
    case 'UPLOAD_COMPANIES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
