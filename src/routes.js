import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Users from './containers/Users';
import Companies from './containers/Companies';
import Groups from './containers/Groups';
import ManageUsers from './containers/ManageUsers';
import Onboard from './containers/Onboard';
import Task from './containers/Task';

export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={Users} />
        <Route path="/companies" component={Companies} />
        <Route path="/groups" component={Groups} />
        <Route path="/manageusers" component={ManageUsers} />
        <Route path="/onboard" component={Onboard} />
        <Route path="/task" component={Task} />
      </Switch>
    </React.Fragment>
  </Router >
);

export default Routes;
