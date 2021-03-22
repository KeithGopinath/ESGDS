import { contactsWatchers } from './Contacts';

export default function* rootWatchers() {
  yield [
    contactsWatchers(),
  ];
}
