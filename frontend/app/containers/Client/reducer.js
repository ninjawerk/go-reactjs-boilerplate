/*
 *
 * Client reducer
 *
 */

import { CLIENT_SET, CLIENT_UNSET } from './constants'
import { fromJS } from 'immutable'

const initialSate = fromJS({
  id: null,
  token: null,
});

const reducer = function clientReducer (state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      return fromJS({
        id: action.token.userId,
        token: action.token,
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
