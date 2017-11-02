import { call, put, takeLatest } from 'redux-saga/effects'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants'

// This will be run when the SIGNUP_REQUESTING
// Action is found by the watcher
function* signupFlow (action) {
  try {
    const { email, password } = action;
    const response = yield call(signupApi, email, password);

    yield put({ type: SIGNUP_SUCCESS, response })
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error })
  }
}

function* signupWatcher () {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

const signupUrl = `chump`;

function signupApi (email, password) {
  return  true
}

export default signupWatcher
