import { handleActions, Action } from 'redux-actions';

import { signIn, signUp, requestSuccess, requestFail, getMe } from './actions';
import User from '../../interfaces/User';

const DEFAULT_STATE: IAppState = {
  fetching: false,
  user: null,
  token: null,
  error: null,
};

export interface IAppState {
  fetching: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

export default handleActions<IAppState, any>(
  {
    [signIn.toString()]: (state) => ({ ...state, fetching: true }),
    [signUp.toString()]: (state) => ({ ...state, fetching: true }),
    [requestSuccess.toString()]: (state, { payload }: Action<{ user: User; token: string }>) => ({
      ...state,
      fetching: false,
      user: payload.user,
      token: payload.token,
      error: null,
    }),
    [requestFail.toString()]: (state, { payload }: Action<{ error: string }>) => ({
      ...state,
      fetching: false,
      user: null,
      token: null,
      error: payload.error,
    }),
    [getMe.toString()]: (state) => ({ ...state, fetching: true }),
  },
  DEFAULT_STATE,
);
