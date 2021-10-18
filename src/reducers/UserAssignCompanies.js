const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_ASSIGN_COMPANIES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        userUpdateCompanies: false,
      };
    case 'USER_ASSIGN_COMPANIES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        userUpdateCompanies: action.userCompanies,
      };
    case 'USER_ASSIGN_COMPANIES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
