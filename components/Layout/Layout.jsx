import React from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import { withTranslation } from "../../i18n";

import "../../assets/css/main.css";

const Layout = props => {
  const { children } = props;
  return (
    <div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withTranslation("common")(Layout);
