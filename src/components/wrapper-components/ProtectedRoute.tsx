import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAdmin, children }) => {
  console.log('ISADMIN: ', isAdmin);
  console.log('children: ', children);
  return isAdmin ? children : <Navigate to='/login' />;
};
