import * as CONTACTS from '../actionTypes/Contacts';

const initialState = {
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS.GET_CONTACTS:
      return {
        ...state,
        isLoading: true,
      };
    case CONTACTS.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contacts: action.contacts,
      };
    case CONTACTS.GET_CONTACTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
