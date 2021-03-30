import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteConstants from '../../constants/RouteConstants';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Users, Companies, Groups, ManageUsers } from '../../containers';
import Dashboard from '../Dashboard';

const HomePage = () => (
  <div className="homePage-main">
    <SideMenuBar />
    <div className="homePage-rightSidePane">
      <Header />
      <Switch>
        <Route path={RouteConstants.DASHBOARD} component={Dashboard} />
        <Route path={RouteConstants.USERS} component={Users} />
        <Route path={RouteConstants.COMPANIES} component={Companies} />
        <Route path={RouteConstants.GROUPS} component={Groups} />
        <Route path={RouteConstants.MANAGEUSERS} component={ManageUsers} />
      </Switch>
    </div>
  </div>
);

export default HomePage;
