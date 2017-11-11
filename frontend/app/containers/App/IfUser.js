import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavDropdown
} from 'reactstrap';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import {isAuthorized} from "../../utils/checkAuth";
import {makeSelectClient} from "../App/selectors";
import {push} from 'react-router-redux';

/*
 If there is more than 1 child, the elements will be wrapped in a fragment
 else it will return the single element.
 */
class IfUser extends Component {
  componentWillUpdate(){
    const {client, redirect, redirectUrl, dispatchPush} = this.props;
    if (!isAuthorized(this.context) || !client) {
      if (redirect) {
        if (redirectUrl)
          dispatchPush(redirectUrl);
        else
          dispatchPush('/login');
      }
    }
  }
  render() {
    const {client} = this.props;
    if (isAuthorized(this.context) && client) {
      if (this.props.children.length > 1) {
        return <fragment>{this.props.children}</fragment>;
      } else {
        return this.props.children;
      }
    }
    return <empty/>
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchPush: (url) => {
      dispatch(push(url));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  client: makeSelectClient()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(IfUser);
