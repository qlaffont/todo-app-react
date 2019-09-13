/* eslint-disable react/jsx-filename-extension */
import React from "react";
import App from "next/app";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import Head from "next/head";

import { appWithTranslation } from "../i18n";

// optional cofiguration for alert
const alertOptions = {
  position: positions.MIDDLE,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>Welcome to totask !</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <style>
            @import url(https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css)
          </style>
          <style>@import url(https://use.fontawesome.com/releases/v5.6.3/css/solid.css)</style>
          <style>@import url(https://use.fontawesome.com/releases/v5.6.3/css/regular.css)</style>
        </Head>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Component {...pageProps} />
        </AlertProvider>
      </div>
    );
  }
}

export default appWithTranslation(MyApp);
