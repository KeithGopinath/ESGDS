import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';
import { forgotPasswordWatchers } from './ForgotPassword';
import { getCompaniesWatchers } from './CompaniesList';
import { employeeWatchers } from './Employee';
import { clientWatchers } from './Client';
import { companyWatchers } from './Company';
import { updatePasswordWatchers } from './UpdatePassword';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
    otpWatchers(),
    forgotPasswordWatchers(),
    getCompaniesWatchers(),
    employeeWatchers(),
    clientWatchers(),
    companyWatchers(),
    updatePasswordWatchers(),
  ];
}
