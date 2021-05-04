import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';
import { forgotPasswordWatchers } from './ForgotPassword';
import { getCompaniesWatchers } from './CompaniesList';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
    otpWatchers(),
    forgotPasswordWatchers(),
    getCompaniesWatchers(),
  ];
}
