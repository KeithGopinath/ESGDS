export default {
  apiEndPoints: {
    getLogin: 'auth',
    getOtp: 'auth/auth-otp',
    getForgotPassword: 'forgotpassword',
    getCompanylist: 'companies',
    getBatchlist: 'batches',
    getOnboard: 'users/new-onboard',
    getUpdatePassword: 'updatepassword',
    createBatch: '/batches',
    getKeyIssues: 'key_issues',
  },
  apiBaseUrl: {
    dev: 'http://65.1.140.116:9010/',
    prod: 'http://65.1.140.116:9010/',
  },
};
