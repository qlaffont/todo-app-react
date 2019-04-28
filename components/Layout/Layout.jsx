import React from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import { withNamespaces } from "../../i18n";

import "../../assets/css/main.css";

const Layout = props => {
  const { children } = props;
  return (
    <div>
      <div>
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withNamespaces("common")(Layout);
