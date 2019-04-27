import React from "react";
import App, { Container } from "next/app";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";

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
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Component {...pageProps} />
        </AlertProvider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
