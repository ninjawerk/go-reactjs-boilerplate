/*
 *
 * Toastr reducer
 *
 */

import {List, fromJS} from 'immutable';
import {} from './constants';
import {ADD_TOAST} from "./constants";
import {CLEAR_TOASTS} from "./constants";

const initialState = fromJS({
  toasts: []
});

function toastrReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TOAST:
      return fromJS( {
        toasts: state.get('toasts').concat([{
        message: action.message,
        toastType: action.toastType,
        date: new Date(),
        }])});
    case CLEAR_TOASTS:
      return fromJS({
        toasts: []
      });
    default:
      return state;
  }
}

export default toastrReducer;
