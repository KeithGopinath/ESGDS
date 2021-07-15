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
import taskDetail from './TaskDetails';
import roleChange from './RoleChange';

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
  taskDetail,
  roleChange,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return combinedReducer(state, action)
}

export default rootReducer;
