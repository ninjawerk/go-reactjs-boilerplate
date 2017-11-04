import {setClient} from 'containers/Client/actions'
import * as React from "react";

export function IfUser(context) {

  if (isAuthorized(context)) {
    return <fragment>{this.props.children}</fragment>;
  }
  return <empty></empty>

};

export function IfGuest(context) {

  if (isAuthorized(context)) {
    return <fragment>{this.props.children}</fragment>;
  }
  return <empty></empty>

};

export function isAuthorized(context) {
  const store = context.store;
  //grab the token from localstorage
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    const token = JSON.parse(storedToken);

    // time of the token vs the ttl (time to live) seconds
    const createdDate = new Date(token.created);
    const created = Math.round(createdDate.getTime() / 1000);
    const ttl = 1209600;
    const expiry = created + ttl;

    // if the token has expired return false
    if (created > expiry) return false;

    // otherwise, dispatch the token
    store.dispatch(setClient(token));
    return true
  }

  return false
}

export function checkIndexAuthorization({dispatch}) {
  return (nextState, replace, next) => {
    if (checkAuthorization(dispatch)) {
      replace('widgets');
      return next()
    }
    // Otherwise let's take them to login!
    replace('login');
    return next()
  }
}

export function checkWidgetAuthorization({dispatch, getState}) {

  return (nextState, replace, next) => {
    console.log(dispatch)
    console.log(getState)
    // reference to the `client` piece of state
    const client = getState().client;

    // is it defined and does it have a token? good, go ahead to widgets
    if (client && client.token) return next();

    // not set yet?  Let's try and set it and if so, go ahead to widgets
    if (checkAuthorization(dispatch)) return next();

    //back to login ya go.
    replace('login');
    return next()
  }
}

export function checkAuthentication(context) {
  const {store, router: {history, route}} = context;
  if (!isAuthorized(context)) {
    const {location: {pathname}} = route;
    history.replace(`login/?redirect=${pathname}`)
  }
}
