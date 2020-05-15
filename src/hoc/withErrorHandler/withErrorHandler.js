import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

// returns function which receives props, 
const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component  {

    state = {
      error: null
    }
    componentWillMount () {
      // clear any errors, so that when request is sent error isn't still present
      this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
        this.setState({ error: null});
        return req;
      });

      // set up axios listener
      this.resInterceptor = axiosInstance.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount () {
      axiosInstance.interceptors.request.eject(this.reqInterceptor);
      axiosInstance.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null});
    }

    render () {
      return (
        <Aux>
          <Modal
            display={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    };
  }
}

export default withErrorHandler;