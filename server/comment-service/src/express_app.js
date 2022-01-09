const express = require("express");
const cors = require("cors");
const HandleErrors = require("./utils/error-handler");
const path = require("path");


// ***** ROUTES *****
const { CommentController } = require("./api");

module.exports = async (app, channel) => {
  const publicPathDirectory = path.join(__dirname, "./public");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  app.use("/public", express.static(publicPathDirectory));

  app.use("/public", express.static("public"));
  
  // ### Using routes API
  CommentController(app, channel)
  // error handling
  app.use(HandleErrors);
};
