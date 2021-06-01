import { faCog, faHome, faUser, faUsers, faBuilding, faTasks, faFolderPlus, faUserTag, faNetworkWired, faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const BUTTONLIST = [
  {
    id: 0, label: 'Dashboard', icon: faHome, address: 'dashboard',
  },
  {
    id: 1, label: 'Validation', icon: faCheckDouble, address: 'validation',
  },
  {
    id: 2, label: 'Taxonomy', icon: faNetworkWired, address: 'taxonomy',
  },
  {
    id: 3, label: 'Users', icon: faUser, address: 'Users',
  },
  {
    id: 4, label: 'Companies', icon: faBuilding, address: 'companies',
  },
  {
    id: 5, label: 'Groups', icon: faUsers, address: 'creategroup',
  },
  {
    id: 6, label: 'Manage Users', icon: faCog, address: 'manageusers',
  },
  {
    id: 7, label: 'Pending Tasks', icon: faTasks, address: 'pendingtasks',
  },
  {
    id: 8, label: 'Batch', icon: faFolderPlus, address: 'createbatch',
  },
  {
    id: 9, label: 'Role Assignment', icon: faUserTag, address: '',
  },
  {
    id: 10, label: 'Task', icon: faUserTag, address: 'createtask',
  },
];

export { BUTTONLIST };
