import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';
import companylist from './CompaniesList';
import updatePassword from './UpdatePassword';

const rootReducer = combineReducers({
  login,
  otp,
  forgotPassword,
  companylist,
  updatePassword,
});

export default rootReducer;
