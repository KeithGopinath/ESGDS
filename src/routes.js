import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Login from './containers/Login';
import UpdatePassword from './containers/UpdatePassword';
import Onboard from './containers/Onboard';
import Dashboard from './containers/Dashboard';
import Users from './containers/Users';
import Groups from './containers/Groups';
import ManageUsers from './containers/ManageUsers';
import Task from './containers/Task/index';
import Createbatch from './containers/BatchView';
import CreateGroup from './containers/GroupCreate';
import PendingTasks from './containers/PendingTasks';
import DataPage from './containers/DataPage';
import TaskCreate from './containers/TaskCreate';
import Taxonomy from './containers/Taxonomy';
import Validation from './containers/Validation';
import TaxonomySubset from './containers/TaxonomySubset';
import ValidationList from './containers/ValidationList';
import UserView from './containers/UserView';
import UserProfile from './containers/UserProfile';
import Controversy from './containers/Controversy';
import ControversyPage from './containers/Controversy/ControversyPage';
import PillarAssignment from './containers/PillarAssignment';
import TaskList from './containers/TaskList';
import Reports from './containers/Reports';
import UploadCompanies from './containers/UploadCompanies';
import ControversyTaskCreate from './containers/ControversyTaskCreate';
import CalculateActuals from './containers/CalculateActuals';
import CalculatePercentile from './containers/CalculatePercentile';
import DataJson from './containers/DataJson';
import ControversyJson from './containers/ControversyJson';
import ErrorPage from './containers/ErrorPage';

export const history = createBrowserHistory();

const Routes = () => {
  const [auth, setAuth] = useState(!!sessionStorage.access);
  useEffect(() => {
    setAuth(true);
  }, []);

  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/password-resets" component={UpdatePassword} />
          <Route path="/onboard" component={Onboard} />
          <AuthRoute auth={auth} path="/dashboard" component={Dashboard} />
          <AuthRoute auth={auth} path="/validation" component={ValidationList} />
          <AuthRoute auth={auth} path="/addvalidation" component={Validation} />
          <AuthRoute auth={auth} path="/taxonomy" component={Taxonomy} />
          <AuthRoute auth={auth} path="/taxonomy-subsets" component={TaxonomySubset} />
          <AuthRoute auth={auth} path="/users" component={Users} />
          <AuthRoute auth={auth} path="/manageusers" component={ManageUsers} />
          <AuthRoute auth={auth} path="/user-view" component={UserView} />
          <AuthRoute auth={auth} path="/user-profile" component={UserProfile} />
          <AuthRoute auth={auth} path="/group-assignment" component={Groups} />
          <AuthRoute auth={auth} path="/group-list" component={CreateGroup} />
          <AuthRoute auth={auth} path="/createbatch" component={Createbatch} />
          <AuthRoute auth={auth} path="/pendingtasks" component={PendingTasks} />
          <AuthRoute auth={auth} path="/task" component={Task} />
          <AuthRoute auth={auth} path="/controversydpcode" component={Controversy} />
          <AuthRoute auth={auth} path="/controversypage" component={ControversyPage} />
          <AuthRoute auth={auth} path="/dpcode" component={DataPage} />
          <AuthRoute auth={auth} path="/createtask" component={TaskCreate} />
          <AuthRoute auth={auth} path="/create-controversy-task" component={ControversyTaskCreate} />
          <AuthRoute auth={auth} path="/tasklist" component={TaskList} />
          <AuthRoute auth={auth} path="/reports" component={Reports} />
          <AuthRoute auth={auth} path="/pillarassignment" component={PillarAssignment} />
          <AuthRoute auth={auth} path="/upload-companies" component={UploadCompanies} />
          <AuthRoute auth={auth} path="/calculate-actuals" component={CalculateActuals} />
          <AuthRoute auth={auth} path="/calculate-percentile" component={CalculatePercentile} />
          <AuthRoute auth={auth} path="/data-json" component={DataJson} />
          <AuthRoute auth={auth} path="/controversy-json" component={ControversyJson} />
          <Route component={ErrorPage} />
        </Switch>
      </React.Fragment>
    </Router >
  );
};

export default Routes;
