/*eslint-disable*/
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
import masterTaxonomy from './MasterTaxonomy';
import clientTaxonomy from './ClientTaxonomy';
import roles from './Roles';
import roleAssignmentEdit from './RoleAssignmentEdit';
import roleOnboarding from './RoleOnboarding';
import newClientTaxonomy from './NewClientTaxonomy';
import filterUsers from './FilterUsers';
import userUpdate from './UserUpdate';
import getUserById from './GetUserById';
import uploadTaxonomy from './UploadTaxonomy';
import getRoleAssignment from './GetRoleAssignment';
import pendingTasks from './PendingTasks';
import matrixMember from './MatrixMember';
import task from './Task';
import taskDetail from './TaskDetails';
import roleChange from './RoleChange';
import { dpCodeData, dpCodeDataPost, dpCodeDataUpdate } from './DpCodeData';
import pillarlist from './GetPillarTaxanomy';
import assignpillar from './PillarAssignment';
import unassignedBatch from './GetUnassignedBatch';
import creategroup from './CreateGroup';
import getgrouplist from './GetGroupList';
import groupbtid from './GetGroupById';
import taskpillar from './OnSelectPillar';
import taxonomyCompany from './TaxonomyCompanies';
import createTask from './CreateTasks';
import uploadCompanies from './UploadCompanies';
import { sourceTypeGet, sourceTypePost } from './SourceType';

import taskList from './GetTaskList';
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
  matrixMember,
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
  sourceTypeGet,
  sourceTypePost,
  dpCodeDataPost,
  dpCodeDataUpdate,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return combinedReducer(state, action)
}

export default rootReducer;
