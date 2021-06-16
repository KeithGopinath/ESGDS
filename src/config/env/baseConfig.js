export default {
  apiEndPoints: {
    getLogin: 'auth',
    getOtp: 'auth/auth-otp',
    getForgotPassword: 'forgotpassword',
    getCompanylist: 'companies',
    getBatchlist: 'batches',
    getOnboard: 'users/new-onboard',
    getUpdatePassword: 'updatepassword',
    createBatch: 'batches/create',
    clientTaxonomy: 'clientTaxonomies',
    getKeyIssues: 'key_issues',
    getMasterTaxonomy: 'taxonomies',
  },
  apiBaseUrl: {
    dev: 'http://65.1.140.116:9010/',
    prod: 'http://65.1.140.116:9010/',
  },
};
