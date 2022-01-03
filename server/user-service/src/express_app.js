const express = require("express");
const cors = require("cors");

const HandleErrors = require("./utils/error-handler");

const { UserController } = require("./api");

module.exports = async (app, channel) => {
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // ### Using routes API
  UserController(app, channel);

  // error handling
  app.use(HandleErrors);
};
