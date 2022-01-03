const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@CallApi": "src/Utils/axiosConfig",
  })(config);

  return config;
};
