import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';
import companylist from './CompaniesList';
import employee from './Employee';
import client from './Client';
import company from './Company';

const rootReducer = combineReducers({
  login,
  otp,
  forgotPassword,
  companylist,
  employee,
  client,
  company,
});

export default rootReducer;
