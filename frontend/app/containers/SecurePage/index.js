/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import {Button} from 'reactstrap';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center bg-light">
        <div>
          <h1 className="text-center">Secure Page</h1>
          <h4 className="text-center">this is a sample secure page</h4>
        </div>
      </div>
    );
  }
}
