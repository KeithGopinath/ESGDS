const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GROUP_CREATE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        grouppost: false,
      };
    case 'GROUP_CREATE_SUCCESS':
      return {
        ...state,
        isLoading: true,
        grouppost: action.creategroup,
      };
    case 'GROUP_CREATE_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
