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
    handleSubmit: PropTypes.func,
  }

  handleSubmit(e) {
    //do stuff here
  }

  render() {
    const { handleSubmit} = this.props;
    return (
      <div className="signup">
        <form className="widget-form" onSubmit={handleSubmit(this.props.onSubmit)}>
          <h1>Signup</h1>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />
          <button action="submit">SIGNUP</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'signup', // a unique identifier for this form
})(SignupForm);
