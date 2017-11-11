import {setClient} from 'containers/App/actions'
import * as React from "react";


export function isAuthorized(context) {
  const store = context.store;
  //grab the token from localstorage
  const stateToken = store.getState().getIn(['client', 'token']);
  if (!stateToken) {
      return false;
  }
  else {
    //from state
    const stateTokenData = store.getState().getIn(['client', 'data']);
    return !hasTokenExpired(stateTokenData);
  }
  return false;
}

export function hasTokenExpired(token) {
  const now = new Date();
  const expiry = new Date(token.exp);
  return now > expiry;
}


export function checkAuthentication(context) {
  const {store, router: {history, route}} = context;
  if (!isAuthorized(context)) {
    const {location: {pathname}} = route;
    history.replace(`login/?redirect=${pathname}`)
  }
}
