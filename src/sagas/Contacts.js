import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as CONTACTS from '../actionTypes/Contacts';
import * as contactActionCreators from '../actionCreators/Contacts';
import { doGet } from '../utils/fetchWrapper';


export function* getContacts() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getContacts);
    yield put(contactActionCreators.getContactsSucccess(response));
  } catch (error) {
    yield put(contactActionCreators.getContactsFailure(error));
  }
}

export function* contactsWatchers() {
  yield [
    takeLatest(CONTACTS.GET_CONTACTS, getContacts),
  ];
}
