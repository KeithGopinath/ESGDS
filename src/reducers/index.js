import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';
import companylist from './CompaniesList';

const rootReducer = combineReducers({
  login,
  otp,
  forgotPassword,
  companylist,
});

export default rootReducer;
