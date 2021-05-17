export default {
  apiEndPoints: {
    getLogin: 'auth',
    getOtp: '/OTPcheck',
    getForgotPassword: '/forgotpassword',
    getCompanylist: '/getCompanies',
    getBatchlist: '/getBatchList',
    getEmployee: '/onBoardEmployee',
    getClient: '/onBoardClient',
    getCompany: '/onBoardCompany',
    getUpdatePassword: '/updatepassword',
  },
  apiBaseUrl: {
    dev: 'http://65.1.140.116:9010/',
    prod: '',
  },
};
