/**
 *
 * Toastr
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectToastr from './selectors';
import reducer from './reducer';
import {toast, ToastContainer} from "react-toastify";
import {TOAST_DEFAULT, TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS, TOAST_WARN} from "./constants";
import {clearToasts} from "./actions";

class Toastr extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidUpdate(){
    const {toasts,clearAll} = this.props;
    toasts.map(function (e) {
      switch (e.toastType){
        case TOAST_DEFAULT:
          toast(e.message);
          break;
        case TOAST_WARN:
          toast.warn(e.message);
          break;
        case TOAST_ERROR:
          toast.error(e.message);
          break;
        case TOAST_INFO:
          toast.info(e.message);
          break;
        case TOAST_SUCCESS:
          toast.success(e.message);
          break;
      }
    });
   if(toasts.length>0) clearAll();
  }
  render() {
    return (
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    );
  }
}


const mapStateToProps = createStructuredSelector({
  toasts: makeSelectToastr(),
});

export function mapDispatchToProps(dispatch) {
  return {
    clearAll: () => {
      dispatch(clearToasts());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'toastr', reducer});

export default compose(
  withReducer,
  withConnect,
)(Toastr);
