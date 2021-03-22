import * as CONTACTS from '../actionTypes/Contacts';

export function getContacts() {
  return {
    type: CONTACTS.GET_CONTACTS,
  };
}

export function getContactsSucccess(contacts) {
  return {
    type: CONTACTS.GET_CONTACTS_SUCCESS,
    contacts,
  };
}

export function getContactsFailure(error) {
  return {
    type: CONTACTS.GET_CONTACTS_FAILURE,
    error,
  };
}
