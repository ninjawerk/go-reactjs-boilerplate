import {take, fork, cancel, call, put, cancelled} from 'redux-saga/effects'

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

import {
  setClient,
  unsetClient,
} from '../Client/actions'

import {
  CLIENT_UNSET,
} from '../Client/constants'
import {API_URL} from "../../configs";
import { push } from 'react-router-redux';

function* loginFlow(email, password) {
  let token;
  try {
    token = yield call(loginApi, email, password);
    yield put(setClient(token));
    yield put({type: LOGIN_SUCCESS});
    localStorage.setItem('token', JSON.stringify(token));
    yield put(push('/home'));
  } catch (error) {
    yield put({type: LOGIN_ERROR, error})
  } finally {
    if (yield cancelled()) {
      yield put(push('/login'));
    }
  }
}

const loginUrl = `${API_URL}/login`;

function loginApi(email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error
    })
}

function* logout () {
  yield put(unsetClient());
  // remove our token
  localStorage.removeItem('token');
  yield put(push('/login'));
}

function* loginWatcher() {
  while (true) {
    const {email, password} = yield take(LOGIN_REQUESTING);
    const task = yield fork(loginFlow, email, password);
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
    if (action.type === CLIENT_UNSET) yield cancel(task);
    yield call(logout);
  }
}

export default loginWatcher
