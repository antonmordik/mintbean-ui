import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchMe, login } from '../../api/auth';
import { requestFail, requestSuccess, getMe, signIn } from './actions';
import { Action } from 'redux-actions';

function* getMeSaga() {
  try {
    const token = localStorage.getItem('app:token');
    const { user } = yield call(fetchMe);
    yield put(requestSuccess({ user, token }));
  } catch(error) {
    yield put(requestFail({ error }));
  }
}

function* signInSaga({ payload }: Action<{ email: string; password: string }>) {
  try {
    const { user, token } = yield call(login, payload.email, payload.password);
    localStorage.setItem('app:token', token);
    yield put(requestSuccess({ user, token }));
  } catch(error) {
    yield put(requestFail({ error }));
  }
}

export default function*() {
  yield takeEvery(getMe, getMeSaga);
  yield takeEvery(signIn, signInSaga);
}