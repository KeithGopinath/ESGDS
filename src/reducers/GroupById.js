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
        isLoading: false,
        groupById: action.getgroupbyid,
      };
    case 'GROUPBYID_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        groupById: false,
      };
    case 'GROUPBYID_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
