import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';
import companylist from './GetCompanies';

const rootReducer = combineReducers({
  loginState: login,
  otpState: otp,
  forgotPasswordState: forgotPassword,
  getCompanyState: companylist,
});

export default rootReducer;
