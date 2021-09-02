/* eslint-disable*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => auth === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />
);

export default AuthRoute;