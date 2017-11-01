import {take, fork, cancel, call, put, cancelled} from 'redux-saga/effects'

import {browserHistory} from 'react-router-dom'



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

function* loginFlow(email, password) {
  let token
  try {
    token = yield call(loginApi, email, password)
    yield put(setClient(token))
    yield put({type: LOGIN_SUCCESS})
    localStorage.setItem('token', JSON.stringify(token))
    browserHistory.push('/widgets')
  } catch (error) {
    yield put({type: LOGIN_ERROR, error})
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/login')
    }
  }
}

const loginUrl = `/api/Clients/login`

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
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient())

  // remove our token
  localStorage.removeItem('token')

  // redirect to the /login screen
  browserHistory.push('/login')
}

function* loginWatcher() {
  while (true) {
    const {email, password} = yield take(LOGIN_REQUESTING)

    const task = yield fork(loginFlow, email, password)

    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

    if (action.type === CLIENT_UNSET) yield cancel(task)

    yield call(logout)
  }
}

export default loginWatcher
