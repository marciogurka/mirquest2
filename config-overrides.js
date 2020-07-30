const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const addDotEnvPlugin = config => {
  config.plugins.push(new Dotenv());
  return config;
};

module.exports = override(
  // add an alias for "~" imports
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src')
  }),
  addDotEnvPlugin
);
