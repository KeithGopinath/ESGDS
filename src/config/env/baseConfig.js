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
  },
  apiBaseUrl: {
    dev: 'http://65.1.140.116:9010/',
    prod: 'http://65.1.140.116:9010/',
  },
};
