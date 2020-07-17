import React from 'react';
import { Switch } from 'react-router';
import Login from './screens/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Lobby from './screens/Lobby';

export default (
  <Switch>
    <ProtectedRoute path={'/lobby'} component={Lobby} redirectTo={'/'} />
    <ProtectedRoute invert path={'/'} component={Login} redirectTo={'/lobby'} />
  </Switch>
);
