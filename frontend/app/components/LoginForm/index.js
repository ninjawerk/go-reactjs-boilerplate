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
      <form className="widget-form" onSubmit={handleSubmit(formSubmit)}>
        <h1>LOGIN</h1>
        <label htmlFor="email">Email</label>
        {/*
         Our Redux Form Field components that bind email and password
         to our Redux state's form -> login piece of state.
         */}
        <Field
          name="email"
          type="text"
          id="email"
          className="email"
          component="input"
        />
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          className="password"
          component="input"
        />
        <button action="submit">LOGIN</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
})(LoginForm);

