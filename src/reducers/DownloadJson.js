const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DOWNLOAD_JSON_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        downloadJson: false,
      };
    case 'DOWNLOAD_JSON_SUCCESS':
      return {
        ...state,
        isLoading: false,
        downloadJson: action.downloadJson,
      };
    case 'DOWNLOAD_JSON_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'DOWNLOAD_JSON_RESET':
      return {
        ...state,
        isLoading: true,
        error: false,
        downloadJson: false,
      };
    default:
      return state;
  }
};
