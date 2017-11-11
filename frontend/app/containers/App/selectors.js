import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');
const selectClientDomain = (state) => state.get('client');


const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectClient = () => createSelector(
  selectClientDomain,
  (substate) => substate.toJS()
);

export {
  makeSelectLocation,
  makeSelectClient
};
