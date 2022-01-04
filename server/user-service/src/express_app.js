const express = require("express");
const cors = require("cors");
const path = require('path');
const HandleErrors = require("./utils/error-handler");

const { UserController } = require("./api");

module.exports = async (app, channel) => {
  const publicPathDirectory = path.join(__dirname, "./public");
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  

  app.use("/public", express.static(publicPathDirectory));

  app.use("/public", express.static("public"));

  // ### Using routes API
  UserController(app, channel);

  // error handling
  app.use(HandleErrors);
};
