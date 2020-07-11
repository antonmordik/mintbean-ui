import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app/reducer';
import history from '../history';

export default combineReducers({
  app,
  router: connectRouter(history),
});
