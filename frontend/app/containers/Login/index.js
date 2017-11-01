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

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.login)
    const {
      handleSubmit, // remember, Redux Form injects this into our props
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props
    return (
      <div className="login">
        <LoginForm formSubmit={handleSubmit}/>
        <div className="auth-messages">
          {/* As in the signup, we're just using the message and error helpers */}
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors}/>
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages}/>
          )}
          {requesting && <div>Logging in...</div>}
          {!requesting && !successful && (
            <Link to="/signup">Need to Signup? Click Here »</Link>
          )}
        </div>
      </div>
    );
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
});

function mapDispatchToProps(dispatch) {
  return {
    loginRequest,
    handleSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loginRequest({
        email:evt.get('email'),
        password: evt.get('password')
      }));
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
