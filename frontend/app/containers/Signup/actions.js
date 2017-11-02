/*
 *
 * Signup actions
 *
 */

import { SIGNUP_REQUESTING } from './constants'

const signupRequest = function signupRequest ({ email, password }) {
  return {
    type: SIGNUP_REQUESTING,
    email,
    password,
  }
};

export default signupRequest
