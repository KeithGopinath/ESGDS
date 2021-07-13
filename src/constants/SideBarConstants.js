/* eslint-disable */
import { faCog, faHome, faUser, faUsers, faBuilding, faTasks, faFolderPlus, faUserTag, faCodeBranch, faNetworkWired, faProjectDiagram, faCheckDouble, faList, faChartBar } from '@fortawesome/free-solid-svg-icons';

const ButtonList = [
  {
    id: 0, label: 'Dashboard', icon: faHome, address: 'dashboard',
  },
  {
    id: 1, label: 'Taxonomy', icon: faCodeBranch, address: 'taxonomyhead',
  },
  {
    id: 2, label: 'Validation', icon: faCheckDouble, address: 'validationhead',
  },
  {
    id: 3, label: 'Users', icon: faUser, address: 'usershead',
  },
  {
    id: 4, label: 'Profile', icon: faUser, address: 'user-profile',
  },
  {
    id: 5, label: 'Role Assignment', icon: faUserTag, address: '',
  },
  {
    id: 6, label: 'Groups', icon: faUsers, address: 'groupshead',
  },
  {
    id: 7, label: 'Batch', icon: faFolderPlus, address: 'createbatch',
  },
  {
    id: 8, label: 'Task', icon: faUserTag, address: 'createtask',
  },
  {
    id: 9, label: 'Pending Tasks', icon: faTasks, address: 'pendingtasks',
  },
  {
    id: 10, label: 'Task List', icon: faList, address: 'tasklist',
  },
  {
    id: 11, label: 'Reports', icon: faChartBar, address: 'reports',
  }
];

const TaxonomySubMenu = [
  {
    id: 0, label: 'Master Taxonomy', icon: faNetworkWired, address: 'taxonomy'
  },
  {
    id: 1, label: 'Subset Taxonomy', icon: faProjectDiagram, address: 'taxonomy-subsets'
  },
]

const ValidationSubMenu = [
  {
    id: 0, label: 'Add Validation', icon: faFolderPlus, address: 'addvalidation'
  },
  {
    id: 1, label: 'Validation List', icon: faList, address: 'validation'
  },
]

const GroupsSubMenu = [
  {
    id: 0, label: 'Group Assignment', icon: faFolderPlus, address: 'group-assignment'
  },
  {
    id: 1, label: 'Group List', icon: faList, address: 'group-list'
  },
]

const UsersSubMenu = [
  {
    id: 0, label: 'User List', icon: faList, address: 'users'
  },
  {
    id: 1, label: 'Manage Users', icon: faCog, address: 'manageusers'
  },
]

export { ButtonList, TaxonomySubMenu, ValidationSubMenu, GroupsSubMenu, UsersSubMenu };
