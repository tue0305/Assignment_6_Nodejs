const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.dev`;
  dotenv.config({ path: configFile});
} else {
  dotenv.config();
}

module.exports = {

  // ***** RABITMQ CONFIG*****
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: 'NAU_AN_NE',
  USER_BINDING_KEY: 'USER_SERVICE',
  POST_BINDING_KEY: 'POST_SERVICE',
  COMMENT_BINDING_KEY: 'COMMENT_SERVICE',
  QUEUE_NAME: 'USER_QUEUE',


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
