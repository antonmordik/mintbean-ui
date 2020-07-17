import { fork, put } from 'redux-saga/effects';
import { getMe } from './app/actions';
import app from './app/saga';

export default function* () {
  yield fork(app);

  if (!!localStorage.getItem('app:token')) {
    yield put(getMe());
  }
}
