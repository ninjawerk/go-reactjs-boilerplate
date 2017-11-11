
import { fromJS } from 'immutable';
import toastrReducer from '../reducer';

describe('toastrReducer', () => {
  it('returns the initial state', () => {
    expect(toastrReducer(undefined, {})).toEqual(fromJS({}));
  });
});
