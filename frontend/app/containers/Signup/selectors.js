import { createSelector } from 'reselect';

/**
 * Direct selector to the signup state domain
 */
const selectSignupDomain = (state) => state.get('signup').toJS()

const selectSignup = () => createSelector(
  selectSignupDomain,
  (homeState) => homeState
);

export {
  selectSignupDomain,
  selectSignup
};
