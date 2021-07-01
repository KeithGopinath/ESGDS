/* eslint-disable */
import { faCog, faHome, faUser, faUsers, faBuilding, faTasks, faFolderPlus, faUserTag, faCodeBranch, faNetworkWired, faProjectDiagram, faCheckDouble, faList } from '@fortawesome/free-solid-svg-icons';

const ButtonList = [
  {
    id: 0, label: 'Dashboard', icon: faHome, address: 'dashboard',
  },
  {
    id: 1, label: 'Validation', icon: faCheckDouble, address: 'validationhead',
  },
  {
    id: 2, label: 'Taxonomy', icon: faCodeBranch, address: 'taxonomyhead',
  },
  {
    id: 3, label: 'Users', icon: faUser, address: 'Users',
  },
  {
    id: 4, label: 'Companies', icon: faBuilding, address: 'companies',
  },
  {
    id: 5, label: 'Groups', icon: faUsers, address: 'groupshead',
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

const TaxonomySubMenu = [
  {
    id: 0, label: 'Master Taxonomy', icon: faNetworkWired, address: 'taxonomy'
  },
  {
    id: 1, label: 'Subset Taxonomy', icon: faProjectDiagram, address: 'taxonomy/subsets'
  },
]

const ValidationSubMenu = [
  {
    id: 0, label: 'Add Validation', icon: faFolderPlus, address: 'validation/addvalidation'
  },
  {
    id: 1, label: 'Validation List', icon: faList, address: 'validation'
  },
]

const GroupsSubMenu = [
  {
    id: 0, label: 'Create Group', icon: faFolderPlus, address: 'creategroup'
  },
  {
    id: 1, label: 'Assignment', icon: faList, address: 'groups'
  },
]

export { ButtonList, TaxonomySubMenu, ValidationSubMenu, GroupsSubMenu };
