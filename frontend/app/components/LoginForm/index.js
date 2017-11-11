/**
*
* LoginForm
*
*/
import React from 'react';
import {Field, reduxForm} from "redux-form/immutable";
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    formSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
  }
  render() {
    const { formSubmit,handleSubmit} = this.props;
    return (
      <form className="widget-form w-100" onSubmit={handleSubmit(formSubmit)}>
        <h1 className="text-center">LOGIN</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <Field name="email" type="email" className="form-control" id="email" component="input" aria-describedby="emailHelp" placeholder="Enter email"/>
         </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" className="form-control" id="password" component="input" aria-describedby="emailHelp" placeholder="Enter email"/>
         </div>
        <div className="w-100 justify-content-center text-center mt-4">
        <button action="submit" className="btn btn-outline-info btn-lg ">LOGIN</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
})(LoginForm);

