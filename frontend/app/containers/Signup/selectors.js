import { createSelector } from 'reselect';

/**
 * Direct selector to the signup state domain
 */
const selectSignupDomain = (state) => state.get('signup');

const selectSignup = () => createSelector(
  selectSignupDomain,
  (substate) => substate.toJS()
);

export {
  selectSignupDomain,
  selectSignup
};
