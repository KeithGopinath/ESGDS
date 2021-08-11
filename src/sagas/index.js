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
import { getUsersByIdWatchers } from './UserById';
import { uploadTaxonomyWatchers } from './UploadTaxonomy';
import { roleAssignmentWatchers } from './RoleAssignment';
import { getPendingTasksWatchers } from './PendingTask';
import { matrixMemberWatchers } from './MatrixMember';
import { taskWatchers } from './Task';
import { getTaskDetailsWatchers } from './TaskDetails';
import { getDpCodeDataWatchers } from './DpCodeData';
import { getpillarWatchers } from './PillarTaxanomy';
import { getPillarassignWatchers } from './PillarAssignment';
import { getunassignedBatchWatchers } from './UnassignedBatch';
import { getCreateGroupWatchers } from './CreateGroup';
import { getGrouplistWatchers } from './GroupList';
import { getGroupbyidWatchers } from './GroupById';
import { gettaskpillatWatchers } from './OnSelectPillar';
import { getTaxnomycompanyWatchers } from './TaxonomyCompanies';
import { getCreateTaskWatchers } from './CreateTasks';
import { uploadCompaniesWatchers } from './UploadCompanies';
import { getGettasklistWatchers } from './TaskList';
import { sourceTypeWatchers } from './SourceType';
import { taskEditDetailsWatchers } from './TaskEditDetails';
import { taskUpdateWatchers } from './UpdateTask';
import { getControversyTaskDataWatchers } from './GetControversyTaskData';
import { createControversyTaskWatchers } from './CreateControversyTask';
import { getReportsWatchers } from './Reports';
import { getReportsTaskListWatchers } from './ReportsTaskList';
import { calculateActualsWatchers } from './CalculateActuals';
import { pillarWisePercentileWatchers } from './PillarWisePercentile';
import { calculatePercentileWatchers } from './CalculatePercentile';

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
    taskWatchers(),
    getTaskDetailsWatchers(),
    getDpCodeDataWatchers(),
    getpillarWatchers(),
    getPillarassignWatchers(),
    getunassignedBatchWatchers(),
    getCreateGroupWatchers(),
    getGrouplistWatchers(),
    getGroupbyidWatchers(),
    gettaskpillatWatchers(),
    getTaxnomycompanyWatchers(),
    getCreateTaskWatchers(),
    uploadCompaniesWatchers(),
    getGettasklistWatchers(),
    sourceTypeWatchers(),
    taskEditDetailsWatchers(),
    taskUpdateWatchers(),
    getControversyTaskDataWatchers(),
    createControversyTaskWatchers(),
    getReportsWatchers(),
    getReportsTaskListWatchers(),
    calculateActualsWatchers(),
    pillarWisePercentileWatchers(),
    calculatePercentileWatchers(),
  ]);
}
