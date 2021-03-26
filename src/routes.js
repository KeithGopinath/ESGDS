import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import SideMenu from './components/SideMenuBar';
import Header from './components/Header';
// import ContactsContainer from './containers/ContactsContainer';
import RouteConstants from './constants/RouteConstants';
import { Users, Companies, Groups, ManageUsers, Dashboard } from './components';

export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
          <Header />
          <Switch>
            {/* <Route exact path="/" component={ContactsContainer} />
            <Route path={RouteConstants.CONTACTS} component={ContactsContainer} /> */}
            <Route path={RouteConstants.DASHBOARD} exact component={Dashboard} />
            <Route path={RouteConstants.USERS} exact component={Users} />
            <Route path={RouteConstants.COMPANIES} exact component={Companies} />
            <Route path={RouteConstants.GROUPS} exact component={Groups} />
            <Route path={RouteConstants.MANAGEUSERS} exact component={ManageUsers} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </div>
    </React.Fragment>
  </Router >
);

export default Routes;

