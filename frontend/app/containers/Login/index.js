/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import loginRequest from './actions'
import {Link} from "react-router-dom";
import LoginForm from "components/LoginForm/index";
import IfGuest from "../App/IfGuest";
import {makeSelectClient} from "containers/App/selectors";
import {push} from 'react-router-redux';
import {isAuthorized} from " utils/checkAuth";

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const {client, dispatchPush} = this.props;
    if (isAuthorized(this.context) && client) {
      dispatchPush('/');
    }
  }
  showMessages(msgs) {
    return (
      <div>
        {msgs.map(function (obj, key) {
          return (<p key={key}>{obj.body}</p>)
        })}
      </div>
    );
  }
  render() {
    const {
      handleSubmit,

      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;
    return (

      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-3">
          <LoginForm formSubmit={handleSubmit}/>
          <hr className="mt-5"/>
          <div className="text-center">
            {/* As in the signup, we're just using the message and error helpers */}
            {!requesting && !!errors.length && (
              <div >Failure to login due to: {this.showMessages(errors)}</div>
            )}
            {!requesting && !!messages.length && (
              <div >{this.showMessages(messages)}</div>
            )}
            {requesting && <div>Logging in...</div>}
            {!requesting && !successful && (
              <Link to="/signup" className="btn btn-simple">Need to Signup? Click Here</Link>
            )}
          </div>
        </div>
      </div>

    );
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,

  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  client: makeSelectClient(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loginRequest({
        email: evt.get('email'),
        password: evt.get('password')
      }));
    },
    dispatchPush: (url) => {
      dispatch(push(url));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
