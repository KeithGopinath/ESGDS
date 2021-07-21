const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GROUPBYID_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        groupById: false,
      };
    case 'GROUPBYID_SUCCESS':
      return {
        ...state,
        isLoading: true,
        groupById: action.getgroupbyid,
      };
    case 'GROUPBYID_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
