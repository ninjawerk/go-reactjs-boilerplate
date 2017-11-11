/**
 *
 * SignupForm
 *
 */

import React from 'react';
import {Field, reduxForm} from "redux-form/immutable";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

class SignupForm extends React.Component {
  static propTypes = {
    formSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { formSubmit,handleSubmit} = this.props;
    return (
      <div className="signup">
        <form className="widget-form w-100" onSubmit={handleSubmit(formSubmit)}>
          <h1 className="text-center">Sign Up</h1>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <Field name="email" type="email" className="form-control" id="email" component="input" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" className="form-control" id="username" component="input" aria-describedby="usernameHelp" placeholder="Enter username"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" id="password" component="input" aria-describedby="emailHelp" placeholder="Enter password"/>
          </div>
          <div className="w-100 justify-content-center text-center mt-4">
            <button action="submit" className="btn btn-outline-info btn-lg ">LOGIN</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'signup', // a unique identifier for this form
})(SignupForm);
