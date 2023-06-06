import React, { FunctionComponent } from 'react';
import { Loading } from '../Loading';
import { Navigate } from 'react-router-dom';

interface RouteWrapperProps {
  children: any;
  loading: boolean;
}

export const RouteWrapper: FunctionComponent<RouteWrapperProps> = ({
  loading,
  children,
}) => {
  console.log('children: ', children);
  if (loading) {
    return <Loading />;
  } else {
    return children;
  }
};
