import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component }) => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default PrivateRoute;


