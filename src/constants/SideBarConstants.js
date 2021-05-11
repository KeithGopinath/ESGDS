import { faCog, faHome, faUser, faUsers, faBuilding, faTasks, faFolderPlus, faUserTag } from '@fortawesome/free-solid-svg-icons';

const BUTTONLIST = [
  {
    id: 0, label: 'Dashboard', icon: faHome, address: 'dashboard',
  },
  {
    id: 1, label: 'Users', icon: faUser, address: 'Users',
  },
  {
    id: 2, label: 'Companies', icon: faBuilding, address: 'companies',
  },
  {
    id: 3, label: 'Groups', icon: faUsers, address: 'groups',
  },
  {
    id: 4, label: 'Manage Users', icon: faCog, address: 'manageusers',
  },
  {
    id: 5, label: 'Pending Tasks', icon: faTasks, address: 'pendingtasks',
  },
  {
    id: 6, label: 'Batch', icon: faFolderPlus, address: 'createbatch',
  },
  {
    id: 7, label: 'Group', icon: faFolderPlus, address: 'creategroup',
  },
  {
    id: 8, label: 'Role Assignment', icon: faUserTag, address: '',
  },
  {
    id: 9, label: 'Task', icon: faUserTag, address: 'createtask',
  },
];

export { BUTTONLIST };
