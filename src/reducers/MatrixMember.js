const initialState = {
  isLoading: false,
};

export const addNewMember = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_MEMBER_SET_DEFAULT':
      return initialState;
    case 'ADD_NEW_MEMBER_POST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case 'ADD_NEW_MEMBER_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        newMember: action.newMember,
      };
    case 'ADD_NEW_MEMBER_POST_FAILURE':
      return {
        ...state,
        isLoading: false,
        newMember: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const activeMembers = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVE_MEMBERS_GET_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case 'ACTIVE_MEMBERS_GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        activeMembers: action.activeMembers,
      };
    case 'ACTIVE_MEMBERS_GET_FAILURE':
      return {
        ...state,
        isLoading: false,
        activeMembers: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const terminateMembers = (state = initialState, action) => {
  switch (action.type) {
    case 'TERMINATE_MEMBERS_SET_DEFAULT':
      return initialState;
    case 'TERMINATE_MEMBERS_POST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case 'TERMINATE_MEMBERS_POST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        terminateMembers: action.terminateMembers,
      };
    case 'TERMINATE_MEMBERS_POST_FAILURE':
      return {
        ...state,
        isLoading: false,
        terminateMembers: false,
        error: action.error,
      };
    default:
      return state;
  }
};
