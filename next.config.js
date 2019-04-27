require("dotenv").config();

const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: config => {
    const newConfig = config;
    newConfig.plugins = config.plugins || [];

    newConfig.plugins = [
      ...newConfig.plugins,

      // Read the .env file
      new Dotenv({
        systemvars: true
      })
    ];

    return newConfig;
  },
  exportPathMap() {
    return {
      "/": { page: "/" }
    };
  }
};
