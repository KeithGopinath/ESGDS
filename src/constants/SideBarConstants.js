import { faCog, faHome, faUser, faUsers, faBuilding, faTasks, faFolderPlus, faUserTag, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const BUTTONLIST = [
  {
    id: 0, label: 'Dashboard', icon: faHome, address: 'dashboard',
  },
  {
    id: 1, label: 'Taxonomy', icon: faNetworkWired, address: 'taxonomy',
  },
  {
    id: 2, label: 'Users', icon: faUser, address: 'Users',
  },
  {
    id: 3, label: 'Companies', icon: faBuilding, address: 'companies',
  },
  {
    id: 4, label: 'Groups', icon: faUsers, address: 'creategroup',
  },
  {
    id: 5, label: 'Manage Users', icon: faCog, address: 'manageusers',
  },
  {
    id: 6, label: 'Pending Tasks', icon: faTasks, address: 'pendingtasks',
  },
  {
    id: 7, label: 'Batch', icon: faFolderPlus, address: 'createbatch',
  },
  {
    id: 8, label: 'Role Assignment', icon: faUserTag, address: '',
  },
  {
    id: 9, label: 'Task', icon: faUserTag, address: 'createtask',
  },
];

export { BUTTONLIST };
