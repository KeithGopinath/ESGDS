const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE':
      return {
        ...state,
        roleChange: action.role,
      };
    default:
      return state;
  }
};
