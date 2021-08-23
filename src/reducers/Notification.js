const initialState = {};

export default (state = initialState, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'NOTIFICATION_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        message: false,
      };
    case 'NOTIFICATION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        message: action.notification,
      };
    case 'NOTIFICATION_TYPE':
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    case 'NOTIFICATION_RESET':
      return {
        ...state,
        isLoading: false,
        message: false,
      };
    case 'NOTIFICATION_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
