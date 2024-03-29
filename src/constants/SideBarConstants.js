/* eslint-disable */
import { faCog, faHome, faUser, faUsers, faTasks, faFolderPlus, faUserTag, faCodeBranch, faNetworkWired, faProjectDiagram, faCheckDouble, faList, faChartBar, faUpload, faCalculator, faEdit } from '@fortawesome/free-solid-svg-icons';

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
    id: 5, label: 'Batch', icon: faFolderPlus, address: 'createbatch',
  },
  {
    id: 6, label: 'Groups', icon: faUsers, address: 'groupshead',
  },
  {
    id: 7, label: 'Task', icon: faUsers, address: 'taskhead',
  },
  {
    id: 8, label: 'Pending Tasks', icon: faTasks, address: 'pendingtasks',
  },
  {
    id: 9, label: 'Calculations', icon: faCalculator, address: 'calculationhead',
  },
  {
    id: 10, label: 'JSON Generation', icon: faEdit, address: 'jsonhead',
  },
  {
    id: 11, label: 'Reports', icon: faChartBar, address: 'reports',
  },
  {
    id: 12, label: 'Upload Company', icon: faUpload, address: 'upload-companies',
  },
];

const TaskSubMenu = [
  {
    id: 0, label: 'Create Task', icon: faUserTag, address: 'createtask',
  },
  {
    id: 1, label: 'Create Controversy Task', icon: faUserTag, address: 'create-controversy-task',
  },
  {
    id: 2, label: 'Task List', icon: faList, address: 'tasklist',
  }
]
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
    id: 1, label: 'Pillar Assignment', icon: faTasks, address: 'pillarassignment',
  },
  {
    id: 2, label: 'Group List', icon: faList, address: 'group-list'
  },
  

]

const UsersSubMenu = [
  {
    id: 0, label: 'User List', icon: faList, address: 'users'
  },
  {
    id: 1, label: 'Manage Users', icon: faCog, address: 'manageusers'
  },
  {
    id: 2, label: 'Role Assignment', icon: faUserTag, address: '',
  },
]

const CalculationSubMenu = [
  {
    id: 0, label: 'Actuals', icon: faList, address: 'calculate-actuals'
  },
  {
    id: 1, label: 'Percentile', icon: faTasks, address: 'calculate-percentile'
  },
]

const JsonGenerationSubMenu = [
  {
    id: 0, label: 'Data', icon: faList, address: 'data-json'
  },
  {
    id: 1, label: 'Controversy', icon: faTasks, address: 'controversy-json'
  },
]

export { ButtonList, TaxonomySubMenu, ValidationSubMenu, GroupsSubMenu, UsersSubMenu, TaskSubMenu, CalculationSubMenu, JsonGenerationSubMenu };
