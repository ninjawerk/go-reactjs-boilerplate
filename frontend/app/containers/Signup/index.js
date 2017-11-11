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
import SignupForm from "components/SignupForm";
import {Link} from 'react-router-dom';
import signupRequest from './actions'

class Signup extends Component {

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
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props;
    return (
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-3">
        <SignupForm formSubmit={handleSubmit}/>
        <hr className="mt-5"/>
        <div className="text-center" >
          {/* As in the signup, we're just using the message and error helpers */}
          {!requesting && !!errors.length && (
            <div >Failed to register due to: {this.showMessages(errors)}</div>
          )}
          {!requesting && !!messages.length && (
            <div >{this.showMessages(messages)}</div>
          )}
          {requesting && <div>Please wait...</div>}
          {!requesting && !successful && (
            <Link to="/login" className="btn btn-simple">Need to Login? Click Here</Link>
          )}
        </div>
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
});


export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(signupRequest({
        email:evt.get('email'),
        password: evt.get('password'),
        username: evt.get('username')
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
