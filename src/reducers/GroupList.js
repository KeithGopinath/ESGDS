const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GROUPLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        grouplist: false,
      };
    case 'GROUPLIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        grouplist: action.getgrouplist,
      };
    case 'GROUPLIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
