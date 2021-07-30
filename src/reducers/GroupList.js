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
        isLoading: true,
        grouplist: action.getgrouplist,
      };
    case 'GROUPLIST_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
