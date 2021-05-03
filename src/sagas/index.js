import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';
import { forgotPasswordWatchers } from './ForgotPassword';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
    otpWatchers(),
    forgotPasswordWatchers(),
  ];
}
