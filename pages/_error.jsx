/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from "react";
import Head from "next/head";

import "../assets/css/main.css";

class Error extends React.Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, namespacesRequired: ["common"] };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div className="centerall">
        <Head>
          <title>
            Error&nbsp;
            {`${statusCode} - Totask` || "No Code - Totask"}
          </title>
        </Head>
        <h1 className="error has-text-centered title is-3">
          Error&nbsp;
          {statusCode || "No Code"}
        </h1>
      </div>
    );
  }
}

export default Error;
