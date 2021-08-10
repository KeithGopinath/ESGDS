/* eslint-disable*/
import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';
import companylist from './CompaniesList';
import onboard from './Onboard';
import updatePassword from './UpdatePassword';
import createBatch from './BatchCreate';
import batchList from './Batch';
import keyIssues from './KeyIssues';
import {masterTaxonomy, masterTaxonomyHeader} from './MasterTaxonomy';
import clientTaxonomy from './ClientTaxonomy';
import roles from './Roles';
import roleAssignmentEdit from './RoleAssignmentEdit';
import roleOnboarding from './RoleOnboarding';
import newClientTaxonomy from './NewClientTaxonomy';
import filterUsers from './FilterUsers';
import userUpdate from './UserUpdate';
import getUserById from './UserById';
import uploadTaxonomy from './UploadTaxonomy';
import getRoleAssignment from './RoleAssignment';
import pendingTasks from './PendingTasks';
import { addNewMember, activeMembers, terminateMembers } from './MatrixMember';
import task from './Task';
import taskDetail from './TaskDetails';
import roleChange from './RoleChange';
import { dpCodeData, dpCodeDataCreate, dpCodeDataEdit } from './DpCodeData';
import pillarlist from './PillarTaxanomy';
import assignpillar from './PillarAssignment';
import unassignedBatch from './UnassignedBatch';
import creategroup from './CreateGroup';
import getgrouplist from './GroupList';
import groupbtid from './GroupById';
import taskpillar from './OnSelectPillar';
import taxonomyCompany from './TaxonomyCompanies';
import createTask from './CreateTasks';
import uploadCompanies from './UploadCompanies';
import { sourceType, sourceTypeCreate } from './SourceType';
import taskEditDetails from './TaskEditDetails';
import taskUpdate from './UpdateTask';
import controversyTaskData from './GetControversyTaskData';
import createControversyTask from './CreateControversyTask';
import reports from './Reports';
import reportsTaskList from './ReportsTaskList';
import calculateActuals from './CalculateActuals';
import controversyReports from './ControversyReports';
import taskList from './TaskList';

const combinedReducer = combineReducers({
  login,
  otp,
  forgotPassword,
  companylist,
  onboard,
  updatePassword,
  createBatch,
  batchList,
  keyIssues,
  masterTaxonomy,
  masterTaxonomyHeader,
  clientTaxonomy,
  roles,
  roleAssignmentEdit,
  roleOnboarding,
  newClientTaxonomy,
  filterUsers,
  userUpdate,
  getUserById,
  uploadTaxonomy,
  getRoleAssignment,
  pendingTasks,
  task,
  taskDetail,
  roleChange,
  dpCodeData,
  pillarlist,
  assignpillar,
  unassignedBatch,
  creategroup,
  getgrouplist,
  groupbtid,
  taskpillar,
  taxonomyCompany,
  createTask,
  uploadCompanies,
  taskList,
  sourceType,
  sourceTypeCreate,
  dpCodeDataCreate,
  dpCodeDataEdit,
  taskEditDetails,
  taskUpdate,
  controversyTaskData,
  createControversyTask,
  reports,
  reportsTaskList,
  addNewMember,
  activeMembers,
  terminateMembers,
  calculateActuals,
  controversyReports,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
