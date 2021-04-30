import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';
import forgotPassword from './ForgotPassword';

const rootReducer = combineReducers({
  loginState: login,
  otpState: otp,
  forgotPasswordState: forgotPassword,
});

export default rootReducer;
