/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SecurePage from 'containers/SecurePage/Loadable';
import SignUp from 'containers/SignUp/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from "containers/Login/Loadable";
import {Container} from 'reactstrap';
import Header from 'containers/Header';
import Sidebar from 'components/Sidebar';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import {compose} from "redux";
import reducer from './reducer';
import injectReducer from "utils/injectReducer";
import IfUser from "./IfUser";
import PropTypes from 'prop-types';
import * as jwtDecode from 'jwt-decode';
import {hasTokenExpired} from "utils/checkAuth";
import {setClient} from "./actions";
import Toastr from 'containers/Toastr'
class AppContainer extends React.Component {
  componentWillMount() {
    const store = this.context.store;
    //grab the token from localstorage
    const stateToken = store.getState().getIn(['client', 'token']);
    if (!stateToken) {
      const storedToken = localStorage.getItem('token');
      if (!storedToken)
        return false;

      const token = jwtDecode(storedToken);
      if (hasTokenExpired(token))
        return false;

      //  dispatch the token
      store.dispatch(setClient(storedToken));
      return true
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <IfUser>
            <Sidebar {...this.props}/>
          </IfUser>
          <Toastr/>
          <main className="main">
            <Container fluid className="h-100">
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/secure" component={SecurePage}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/login" component={Login}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </Container>
          </main>
          <IfUser>
            <Aside />
          </IfUser>
        </div>
        <Footer />
      </div>
    )
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }
}

const withReducer = injectReducer({key: 'client', reducer});

export default compose(
  withReducer,
)(AppContainer);
