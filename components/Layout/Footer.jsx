import React from "react";
import PropTypes from "prop-types";

import { withTranslation, i18n } from "../../i18n";

const Footer = props => {
  const { t } = props;

  return (
    <div className="has-text-centered">
      <p>
        <span>{`${t("credits")} `}</span>
        Quentin Laffont
      </p>
      <div className="languages">
        {i18n.options.allLanguages.map(language => {
          return (
            <button
              className={`button btn-sm ${language === props.i18n.language ? "is-info" : ""}`}
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
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string
  }).isRequired
};

Footer.getInitialProps = async ({ req }) => {
  return {
    namespacesRequired: ["footer"],
    selectedLanguage: req ? req.language : i18n.language
  };
};

export default withTranslation("footer")(Footer);
