import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchMe } from '../../api/auth';
import { requestFail, requestSuccess, getMe } from './actions';

function* getMeSaga() {
  try {
    const token = localStorage.getItem('app:token');
    const { user } = yield call(fetchMe);
    yield put(requestSuccess({ user, token }));
  } catch(error) {
    yield put(requestFail({ error }));
  }
}

export default function*() {
  yield takeEvery(getMe, getMeSaga);
}