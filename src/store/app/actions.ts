import { createActions } from 'redux-actions';

export const { signIn, signUp, requestSuccess, requestFail, getMe } = createActions(
  'SIGN_IN',
  'SIGN_UP',
  'REQUEST_SUCCESS',
  'REQUEST_FAIL',
  'GET_ME',
);
