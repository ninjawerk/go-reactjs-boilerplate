import { createSelector } from 'reselect';

/**
 * Direct selector to the toastr state domain
 */
const selectToastrDomain = (state) => state.get('toastr');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Toastr
 */

const makeSelectToastr = () => createSelector(
  selectToastrDomain,
  (substate) => substate.get('toasts').toJS()
);

export default makeSelectToastr;
export {
  selectToastrDomain,
};
