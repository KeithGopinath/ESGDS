import { loginWatchers } from './Login';

export default function* rootWatchers() {
  yield [
    loginWatchers(),
  ];
}
