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
import roleAssignment from './GetRoleAssignment';
import roleAssignmentEdit from './RoleAssignmentEdit';
import RoleOnboarding from './RoleOnboarding';
import newClientTaxonomy from './NewClientTaxonomy';

const rootReducer = combineReducers({
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
  roleAssignment,
  roleAssignmentEdit,
  RoleOnboarding,
  newClientTaxonomy,
});

export default rootReducer;
