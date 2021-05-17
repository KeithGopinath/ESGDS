import { loginWatchers } from './Login';
import { otpWatchers } from './Otp';
import { forgotPasswordWatchers } from './ForgotPassword';
import { companyListWatchers } from './CompaniesList';
import { employeeWatchers } from './Employee';
import { clientWatchers } from './Client';
import { companyWatchers } from './Company';
import { updatePasswordWatchers } from './UpdatePassword';
import { getBatchWatchers } from './Batch';
import { getCreateBatchWatchers } from './BatchCreate';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
    otpWatchers(),
    forgotPasswordWatchers(),
    companyListWatchers(),
    employeeWatchers(),
    clientWatchers(),
    companyWatchers(),
    updatePasswordWatchers(),
    getBatchWatchers(),
    getCreateBatchWatchers(),
  ];
}
