import App from 'next/app';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    // console.log(pageProps);

    return <Component {...pageProps} />;
  }
}

MyApp.propTypes = propTypes;

export default MyApp;
