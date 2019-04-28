import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { withNamespaces } from "../i18n";

import "../assets/css/main.css";

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    let statusCode = null;
    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    }
    return {
      namespacesRequired: ["common"],
      statusCode
    };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div>
        <Head>
          <title>
            Error&nbsp;
            {`${statusCode} - Totask` || "No Code - Totask"}
          </title>
        </Head>
        <div className="centerall">
          <div className="error has-text-centered">
            <h1 className="title is-3">
              Error&nbsp;
              {statusCode || "No Code"}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

Error.defaultProps = {
  statusCode: null
};

Error.propTypes = {
  statusCode: PropTypes.number
};

export default withNamespaces("common")(Error);
