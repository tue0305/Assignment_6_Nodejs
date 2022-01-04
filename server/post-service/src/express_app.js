const express = require("express");
const cors = require("cors");
const HandleErrors = require("./utils/error-handler");

// ***** ROUTES *****
const { CategoryController, PostController } = require("./api");

module.exports = async (app, channel) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // ### Using routes API
  CategoryController(app, channel);
  PostController(app, channel);

    // error handling
    app.use(HandleErrors);
};
