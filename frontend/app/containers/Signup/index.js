/**
 *
 * Signup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
import {Component} from "react/lib/ReactBaseClasses";
import SignupForm from "../../components/SignupForm";
import { Link } from 'react-router-dom';
import signupRequest from './actions'

class Signup extends Component {
  submit = (values) => {
    // we could just do signupRequest here with the static proptypes
    // but ESLint doesn't like that very much...
    this.props.signupRequest(values)

  }

  render() {
    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props
    return (
      <div>
        <SignupForm onSubmit={this.submit}/>
        <div className="auth-messages">
          {!requesting && !!errors.length && (
            <Errors message="Failure to signup due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {!requesting && successful && (
            <div>
              Signup Successful! <Link to="/login">Click here to Login »</Link>
            </div>
          )}
          {/* Redux Router's <Link> component for quick navigation of routes */}
          {!requesting && !successful && (
            <Link to="/login">Already a Widgeter? Login Here »</Link>
          )}
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSubmit: PropTypes.func,
  signupRequest: PropTypes.func,
  signup: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signupRequest
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


const withReducer = injectReducer({key: 'signup', reducer});
const withSaga = injectSaga({key: 'signup', saga});


export  default compose(
  withReducer,
  withSaga,
  withConnect,
)(Signup);
