/*
 *
 * Login reducer
 *
 */

import {fromJS ,Map } from 'immutable';

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

const initialState = fromJS({
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
});

const reducer = function loginReducer(state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return fromJS({
        requesting: true,
        successful: false,
        messages: [{body: 'Logging in...', time: new Date()}],
        errors: [],
      });

    // Successful?  Reset the login state.
    case LOGIN_SUCCESS:
      return fromJS({
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      });

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN_ERROR:

      return fromJS({
        errors: state.get('errors').concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      });

    default:
      return state
  }
};

export default reducer
