/*
 *
 * Signup actions
 *
 */

import { SIGNUP_REQUESTING } from './constants'

const signupRequest = function signupRequest ({ email, password, username }) {
  return {
    type: SIGNUP_REQUESTING,
    email,
    password,
    username
  }
};

export default signupRequest
