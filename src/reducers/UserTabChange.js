const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_TAB_CHANGE':
      return {
        ...state,
        userTab: action.userTab,
      };
    default:
      return state;
  }
};
