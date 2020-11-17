import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';

import { IGlobalState } from '../../store';

interface ProtectedRouteProps {
  redirectTo: string;
  invert?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps & RouteProps> = ({ redirectTo, invert = false, ...props }) => {
  const user = useSelector((state: IGlobalState) => state.app.user);

  return invert !== !!user ? <Route {...props} /> : <Redirect to={redirectTo} />;
};

export default ProtectedRoute;
