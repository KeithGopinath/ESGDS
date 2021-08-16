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
        isLoading: false,
        grouppost: action.creategroup,
      };
    case 'GROUP_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        grouppost: false,
      };
    case 'GROUP_CREATE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
