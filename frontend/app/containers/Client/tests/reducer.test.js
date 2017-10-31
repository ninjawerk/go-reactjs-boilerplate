
import { fromJS } from 'immutable';
import clientReducer from '../reducer';

describe('clientReducer', () => {
  it('returns the initial state', () => {
    expect(clientReducer(undefined, {})).toEqual(fromJS({}));
  });
});
