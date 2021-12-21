const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.dev`;
  dotenv.config({ path: configFile});
} else {
  dotenv.config();
}

module.exports = {

  // ***** KAFKA CONFIG*****
  BROKERS: process.env.KAFKA_BROKERS,

  PORT: process.env.PORT,
  DB_URL: process.env.DB_URI,

  ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN,

  DEFAULT_AVATAR: process.env.DEFAULT_AVATAR_LINK,

  // ***** EMAIL CONFIG*****
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
};
