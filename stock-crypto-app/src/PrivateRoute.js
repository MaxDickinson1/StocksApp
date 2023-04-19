import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { currentUser } = useAuth();
  const history = useHistory();

  if (!currentUser) {
    history.replace('/auth');
    return null;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;



