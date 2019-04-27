require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        systemvars: true
      })
    ];

    return config;
  },
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  }
};
