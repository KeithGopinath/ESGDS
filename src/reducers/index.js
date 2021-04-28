import { combineReducers } from 'redux';
import login from './Login';

const rootReducer = combineReducers({
  loginState: login,
});

export default rootReducer;
