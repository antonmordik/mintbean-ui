import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchMe, login, register } from '../../api/auth';
import { requestFail, requestSuccess, getMe, signIn, signUp } from './actions';
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

function* signUpSaga({ payload }: Action<{ email: string; password: string; nickname: string }>) {
  try {
    const { user, token } = yield call(register, payload.email, payload.password, payload.nickname);
    localStorage.setItem('app:token', token);
    yield put(requestSuccess({ user, token }));
  } catch(error) {
    yield put(requestFail({ error }));
  }
}

export default function*() {
  yield takeEvery(getMe, getMeSaga);
  yield takeEvery(signIn, signInSaga);
  yield takeEvery(signUp, signUpSaga);
}