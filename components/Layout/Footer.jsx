import React from "react";
import PropTypes from "prop-types";

import { Router, withNamespaces, i18n } from "../../i18n";

const Footer = props => {
  const { t } = props;
  return (
    <div className="has-text-centered">
      <p>
        <span>{t("credits")}</span>
        &nbsp;Quentin Laffont
      </p>
      <div className="languages">
        {i18n.options.allLanguages.map((language, i) => {
          return (
            <button
              className={`button btn-sm ${
                i18n.language && language === i18n.language ? "is-info" : ""
              }`}
              onClick={() => i18n.changeLanguage(language)}
              key={language}
              type="button"
            >
              {language}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

Footer.getInitialProps = () => {
  return {
    namespacesRequired: ["footer"]
  };
};

export default withNamespaces("footer")(Footer);
