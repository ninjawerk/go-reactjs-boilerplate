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
import  {selectSignup, selectSignupDomain} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {Component} from "react/lib/ReactBaseClasses";
import SignupForm from "../../components/SignupForm";
import {Link} from 'react-router-dom';
import signupRequest from './actions'

class Signup extends Component {


  render() {
    console.log(this.props.signup)
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
        <SignupForm formSubmit={handleSubmit}/>
        <div className="auth-messages">
           <p>errors: {errors.length}</p>
          <p>messages: {messages.length}</p>
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
   signup: selectSignup(),
})


export function mapDispatchToProps(dispatch) {
  return {
    signupRequest,
    handleSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(signupRequest({
        email:evt.get('email'),
        password: evt.get('password')
      }));
    },
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
