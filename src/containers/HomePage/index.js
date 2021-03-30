import React, { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteConstants from '../../constants/RouteConstants';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Users, Companies, Groups, ManageUsers } from '../../containers';
import Dashboard from '../Dashboard';

const HomePage = () => {
  const sideBarRef = useRef();
  return (
    <div className="homePage-main">
      <SideMenuBar ref={sideBarRef} />
      <div className="homePage-rightSidePane">
        <Header sideBarRef={sideBarRef} />
        <Switch>
          <Route path={RouteConstants.DASHBOARD} exact component={Dashboard} />
          <Route path={RouteConstants.USERS} exact component={Users} />
          <Route path={RouteConstants.COMPANIES} exact component={Companies} />
          <Route path={RouteConstants.GROUPS} exact component={Groups} />
          <Route path={RouteConstants.MANAGEUSERS} exact component={ManageUsers} />
        </Switch>
      </div>
    </div>
  );
};

export default HomePage;
