const express = require("express");
const cors = require("cors");
const { appEvent } = require("./api");
const HandleErrors = require("./utils/error-handler");

// ***** ROUTES *****
// const commentRouter = require("./routes/comment");

module.exports = async (app) => {
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  //Listen to Events //
  appEvent(app);

  // ### Using routes
  // app.use("/api/comment", commentRouter);

  // error handling
  app.use(HandleErrors);
};
