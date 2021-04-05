import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import RouteConstants from './constants/RouteConstants';
import Login from './containers/Login';
import Onboard from './containers/Onboard';


export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route exact path={RouteConstants.LOGIN} component={Login} />
        <Route path={RouteConstants.DASHBOARD} component={HomePage} />
        <Route path={RouteConstants.USERS} component={HomePage} />
        <Route path={RouteConstants.COMPANIES} component={HomePage} />
        <Route path={RouteConstants.GROUPS} component={HomePage} />
        <Route path={RouteConstants.MANAGEUSERS} component={HomePage} />
        <Route path={RouteConstants.ONBOARD} component={Onboard} />
      </Switch>
    </React.Fragment>
  </Router >
);

export default Routes;

