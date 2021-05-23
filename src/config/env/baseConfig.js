export default {
  apiEndPoints: {
    getLogin: 'auth',
    getOtp: 'OTPcheck',
    getForgotPassword: 'password-resets',
    getCompanylist: 'companies',
    getBatchlist: 'batches',
    getEmployee: 'onBoardEmployee',
    getClient: 'onBoardClient',
    getCompany: 'onBoardCompany',
    getOnboard: 'onBoardCompany',
    getUpdatePassword: 'password-resets/',
    createBatch: '/batches',
    getKeyIssues: 'key_issues',
  },
  apiBaseUrl: {
    dev: 'http://65.1.140.116:9010/',
    prod: '',
  },
};
