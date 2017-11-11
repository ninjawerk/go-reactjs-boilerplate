/*
 *
 * Toastr actions
 *
 */

import {
  ADD_TOAST, CLEAR_TOASTS,
} from './constants';

export function addToast({message, toastType}) {
  return {
    type: ADD_TOAST,
    message,
    toastType
  };
}

export function clearToasts() {
  return {
    type: CLEAR_TOASTS
  };
}
