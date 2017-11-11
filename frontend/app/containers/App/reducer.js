/*
 *
 * Client reducer
 *
 */

import { CLIENT_SET, CLIENT_UNSET } from './constants'
import { fromJS } from 'immutable'
import * as jwtDecode from 'jwt-decode';
const initialSate =fromJS({
  id: null,
  token: null,
});

const reducer = function clientReducer (state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      const tokenData = jwtDecode(action.token);
      return fromJS({
        token: action.token,
        data: tokenData
      });

    case CLIENT_UNSET:

      return fromJS({
        id: null,
        token: null,
      });

    default:
      return state
  }
};

export default reducer
