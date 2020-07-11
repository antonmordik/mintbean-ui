import React from 'react';
import { Switch } from 'react-router';
import Login from './screens/Login';
import ProtectedRoute from './components/ProtectedRoute';


export default (
  <Switch>
    <ProtectedRoute invert path={'/'} component={Login} redirectTo={'/lobby'} />
  </Switch>
);
