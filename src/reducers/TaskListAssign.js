const initialState = {};

export const pendingTasklist = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PENDING_TASKLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        // data: false,
      };
    case 'GET_PENDING_TASKLIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.pendingTasklist,
      };
    case 'GET_PENDING_TASKLIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const completedTasklist = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMPLETED_TASKLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        // data: false,
      };
    case 'GET_COMPLETED_TASKLIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.completedTasklist,
      };
    case 'GET_COMPLETED_TASKLIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const controversyTasklist = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTROVERSY_TASKLIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        // data: false,
      };
    case 'GET_CONTROVERSY_TASKLIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.contorversyTasklist,
      };
    case 'GET_CONTROVERSY_TASKLIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
