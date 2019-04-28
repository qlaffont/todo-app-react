import React from "react";
import App, { Container } from "next/app";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import Head from "next/head";

import { appWithTranslation } from "../i18n";

// optional cofiguration
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Welcome to totask !</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <style>@import url(https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css)</style>
        <style>@import url(https://use.fontawesome.com/releases/v5.6.3/css/solid.css)</style>
        <style>@import url(https://use.fontawesome.com/releases/v5.6.3/css/regular.css)</style>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Component {...pageProps} />
        </AlertProvider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
