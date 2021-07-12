import { all } from 'redux-saga/effects';
import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';
import { forgotPasswordWatchers } from './ForgotPassword';
import { companyListWatchers } from './CompaniesList';
import { onboardWatchers } from './Onboard';
import { updatePasswordWatchers } from './UpdatePassword';
import { getBatchWatchers } from './Batch';
import { getCreateBatchWatchers } from './BatchCreate';
import { getKeyIssuesWatchers } from './KeyIssues';
import { getMasterTaxonomyWatchers } from './MasterTaxonomy';
import { getClientTaxonomyWatchers } from './ClientTaxonomy';
import { getRolesWatchers } from './Roles';
import { roleAssignmentEditWatchers } from './RoleAssignmentEdit';
import { roleOnboarddingWatchers } from './RoleOnboarding';
import { newClientTaxonomyWatchers } from './NewClientTaxonomy';
import { filterUsersWatchers } from './FilterUsers';
import { userUpdateWatchers } from './UserUpdate';
import { getUsersByIdWatchers } from './GetUserById';
import { uploadTaxonomyWatchers } from './UploadTaxonomy';
import { roleAssignmentWatchers } from './GetRoleAssignment';
import { getPendingTasksWatchers } from './PendingTask';
import { matrixMemberWatchers } from './MatrixMember';

export default function* rootWatchers() {
  yield all([
    loginWatchers(),
    otpWatchers(),
    forgotPasswordWatchers(),
    companyListWatchers(),
    onboardWatchers(),
    updatePasswordWatchers(),
    getBatchWatchers(),
    getCreateBatchWatchers(),
    getKeyIssuesWatchers(),
    getMasterTaxonomyWatchers(),
    getClientTaxonomyWatchers(),
    getRolesWatchers(),
    roleAssignmentEditWatchers(),
    roleOnboarddingWatchers(),
    newClientTaxonomyWatchers(),
    filterUsersWatchers(),
    userUpdateWatchers(),
    getUsersByIdWatchers(),
    uploadTaxonomyWatchers(),
    roleAssignmentWatchers(),
    getPendingTasksWatchers(),
    matrixMemberWatchers(),
  ]);
}
