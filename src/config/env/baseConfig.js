export default {
  apiEndPoints: {
    getLogin: 'auth',
    getOtp: 'auth/auth-otp',
    getForgotPassword: 'password-resets',
    getCompanylist: 'companies',
    getBatchlist: 'batches',
    getOnboard: 'users/new-onboard',
    createBatch: 'batches/create',
    clientTaxonomy: 'clientTaxonomies',
    getKeyIssues: 'key_issues',
    getMasterTaxonomy: 'taxonomies',
    getRoles: 'role',
    roleAssignmentEdit: 'users/assign-role',
    getRoleFileOnboarding: 'users/new-onboard/upload-emails-file',
    getRoleListOnboarding: 'users/new-onboard/send-mails',
    newClientTaxonomy: 'clientTaxonomies/create',
    getFilterUsers: 'users/filter-user',
    userUpdate: 'users',
    uploadTaxonomy: 'datapoints/upload',
    getPendingTasksList: 'taskAssignments/my-tasks',
    getTask: 'datapoints/list',
    gettaskDetails: 'taskAssignments/getGroupAndBatches',
    getDpCodeData: 'datapoints/dpDetails',
    getpillarTaxonomy: 'categories/taxonomy-pillars',
    unassignedBatches: 'batches/all/unassigned',
    createGroup: 'groups/create',
    getGroupList: 'groups',
    getGroupById: 'groups',
    onSelectpillar: 'taskAssignments/getAllAssignedUsers',
    pillarAssignment: 'user_pillar_assignments/create',
    taxonomyCompanies: 'companies/all/unassigned',
    uploadCompanies: 'companies/upload-companies-file',
    createTask: 'taskAssignments/create',
    // getTaskList: 'taskAssignments',
    getTaskList: 'taskAssignments',
    getSourceType: 'sourceTypes',
    postSourceType: 'companySources/uploadCompanySource',
    getControversyTask: 'controversy_tasks',
    getControversyDpCodeData: 'controversies/fetch',
    postControversyDpCodeData: 'controversies/add/new-controversy',
    updateControversyDpCodeData: 'controversies/update',
    taskEditDetails: 'taskAssignments/getQaAndAnalyst',
    updateTask: 'taskAssignments/updateSlaDates',
    getControversyTaskData: 'controversy_tasks/fetch_new_task_data',
    createControversyTask: 'controversy_tasks/new-task',
    getActiveBoardMatrixMembers: 'boardMembers/activeBoardMembers',
    getActiveKmpMatrixMembers: 'kmp/activeKmpMembers',
    postAddNewBoardMatrixMember: 'boardMembers',
    postAddNewKmpMatrixMember: 'kmp',
    postTerminateBoardMatrixMembers: 'boardMembers/deleteBoardMember',
    postTerminateKmpMatrixMembers: 'kmp/deleteKmpMembers',
    calculateActuals: 'projected_values/calculate_actuals',
    getMasterTaxonomyHeader: 'taxonomies',
    pillarWisePercentile: 'projected_values/pillar_wise_percentile',
    calculatePercentile: 'projected_values/save_projected_value',
    getReports: 'taskAssignments/task/reports',
    getReportsTaskList: 'taskAssignments/taskListWithStatus',
    controversyTaskList: 'taskAssignments/taskListForControversy',
    updateDpCodeData: 'standalone_datapoints/saveDatapointDetails',
    verificationUpdateDpCodeData: 'errorDetails/saveErrorDetails',
    reviewUpdateDpCodeData: 'errorDetails/saveRepErrorDetails',
    getCompanySourceTypes: 'companySources',
    taskSubmitPost: 'taskAssignments/updateCompanyStatus',
    slaExtension: 'taskSlaLogs/slaExtensionRequest',
    postDerivedDataCalculation: 'derived_datapoints/derivedCalculation',
    getDataJson: 'json_files/payLoadGenerationDetails/data',
    getControversyJson: 'json_files/payLoadGenerationDetails/controversy',
    generateJson: 'json_files/generate-json',
    downloadJson: 'json_files/download-json',
    getDpCodeDataForClientCompanyRep: 'datapoints/repDpDetails',
    getDpCodeValidation: 'validations/validateDpDetails',
    controversyUpdate: 'controversy_tasks/update-task',
    getNotification: 'notifications/my-notifications',
    getDashboard: 'dashboards',
    rejectsla: 'taskSlaLogs/reject',
    raisedSla: 'taskSlaLogs/task-requests',
    userAssingCompanies: 'users/assign-companies',
    cloneActuals: 'projected_values/copy_actuals_as_projected',
    getSubsetTaxonomyDownload: 'datapoints/downloadSubsetTaxmonony',
    getPendingTaskAssignment: 'taskAssignments/SuperAdmin/Pending',
    getCompletedTaskAssignment: 'taskAssignments/SuperAdmin/Completed',
    getControversyTaskAssignment: 'taskAssignments/SuperAdmin/Controversy',
  },
  apiBaseUrl: {
    // dev: 'http://3.108.113.82/',
    // test: 'http://3.109.80.244/',
    dev: 'https://dev-backend.esgds.com/',
    test: 'https://qa-backend.esgds.com/',
    prod: 'https://api.esgds.ai/',
  },
};
