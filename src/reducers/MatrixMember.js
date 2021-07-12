const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MATRIX_MEMBER_PUT_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case 'MATRIX_MEMBER_PUT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        matrixMember: action.matrixMember,
      };
    case 'MATRIX_MEMBER_PUT_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
