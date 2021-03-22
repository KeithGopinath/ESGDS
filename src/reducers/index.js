import { combineReducers } from 'redux';
import contacts from './Contacts';

const rootReducer = combineReducers({
  contactsState: contacts,
});

export default rootReducer;
