import {take, fork, cancel, call, put, cancelled} from 'redux-saga/effects'
import  * as md5 from  'md5'
import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

import {
  setClient,
  unsetClient,
} from 'containers/App/actions'

import {
  CLIENT_UNSET,
} from 'containers/App/constants'
import {API_URL} from "../../configs";
import {push} from 'react-router-redux';

function* loginFlow(email, password) {
  let token;
  try {
    token = yield call(loginApi, email, password);
    yield put(setClient(token.token));
    yield put({type: LOGIN_SUCCESS});
    yield localStorage.setItem('token', token.token);
    yield  put(push('/'));
  } catch (error) {
    yield put({type: LOGIN_ERROR, error})
  }
}

const loginUrl = `${API_URL}/login`;

function loginApi(email, password) {
  password = md5(password);
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json()
    })
    .then(json => json)
    .catch((error) => {
      throw error
    })
}

function* logout() {
  yield put(unsetClient());
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
