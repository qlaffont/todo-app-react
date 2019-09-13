/* eslint-disable no-undef */
const NextI18Next = require("next-i18next").default;

const languages = ["en", "fr"];

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["fr"],
  localeSubpaths: {
    fr: "fr"
  }
});

NextI18NextInstance.i18n.languages = languages;

module.exports = NextI18NextInstance;
