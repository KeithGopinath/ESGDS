import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
    otpWatchers(),
  ];
}
