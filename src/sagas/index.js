import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';
import { forgotPasswordWatchers } from './ForgotPassword';
import { getCompaniesWatchers } from './CompaniesList';
import { updatePasswordWatchers } from './UpdatePassword';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
    otpWatchers(),
    forgotPasswordWatchers(),
    getCompaniesWatchers(),
    updatePasswordWatchers(),
  ];
}
