import React from 'react';
import { Route } from 'react-router-dom';
import RouteConstants from '../../constants/RouteConstants';
import { SideMenuBar, Header } from '../../components';
import { Dashboard, Users, Companies, Groups, ManageUsers } from '../../containers';


const HomePage = () => (
  <div className="homePage-main">
    <SideMenuBar />
    <div className="homePage-rightSidePane">
      <Header />
      <Route path={RouteConstants.DASHBOARD} exact component={Dashboard} />
      <Route path={RouteConstants.USERS} exact component={Users} />
      <Route path={RouteConstants.COMPANIES} exact component={Companies} />
      <Route path={RouteConstants.GROUPS} exact component={Groups} />
      <Route path={RouteConstants.MANAGEUSERS} exact component={ManageUsers} />
    </div>
  </div>
);

export default HomePage;
