import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactsContainer from './containers/ContactsContainer';
import RouteConstants from './constants/RouteConstants';

export const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={ContactsContainer} />
        <Route path={RouteConstants.CONTACTS} component={ContactsContainer} />
      </Switch>
      <Footer />
    </React.Fragment>
  </Router >
);

export default Routes;

