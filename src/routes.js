import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
// import ContactsContainer from './containers/ContactsContainer';
import { HomePage } from './containers';
import RouteConstants from './constants/RouteConstants';

export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      {/* <Header /> */}
      <Switch>
        {/* <Route exact path="/" component={ContactsContainer} />
        <Route path={RouteConstants.CONTACTS} component={ContactsContainer} /> */}
        <Route path={RouteConstants.HOMEPAGE} component={HomePage} />
      </Switch>
      {/* <Footer /> */}
    </React.Fragment>
  </Router >
);

export default Routes;

