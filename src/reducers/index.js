import { combineReducers } from 'redux';
import login from './Login';
import otp from './Otp';

const rootReducer = combineReducers({
  loginState: login,
  otpState: otp,
});

export default rootReducer;
