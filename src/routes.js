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
import Createbatch from './containers/BatchView';
import CreateGroup from './containers/GroupCreate';
import PendingTasks from './containers/PendingTasks';
import DataPage from './containers/DataPage';
import UpdatePassword from './containers/UpdatePassword';
import TaskCreate from './containers/TaskCreate/index';
import Taxonomy from './containers/Taxonomy';
import Validation from './containers/Validation';
import TaxonomySubset from './containers/TaxonomySubset';
import ValidationList from './containers/ValidationList';
import UserView from './containers/UserView';

export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/password-resets" component={UpdatePassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/validation" component={ValidationList} />
        <Route path="/validation/addvalidation" component={Validation} />
        <Route exact path="/taxonomy" component={Taxonomy} />
        <Route path="/taxonomy/subsets" component={TaxonomySubset} />
        <Route path="/users" component={Users} />
        <Route path="/user-view" component={UserView} />
        <Route path="/companies" component={Companies} />
        <Route exact path="/groups" component={Groups} />
        <Route path="/manageusers" component={ManageUsers} />
        <Route path="/onboard" component={Onboard} />
        <Route path="/task" component={Task} />
        <Route path="/createbatch" component={Createbatch} />
        <Route path="/creategroup" component={CreateGroup} />
        <Route path="/pendingtasks" component={PendingTasks} />
        <Route path="/task" component={Task} />
        <Route path="/dpcode" component={DataPage} />
        <Route exact path="/createtask" component={TaskCreate} />
      </Switch>
    </React.Fragment>
  </Router >
);

export default Routes;
