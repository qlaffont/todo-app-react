/* eslint-disable no-undef */
const NextI18Next = require("next-i18next/dist/commonjs");

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["fr"],
  localeSubpaths: "foreign",
  react: {
    wait: true
  }
});

module.exports = NextI18NextInstance;
