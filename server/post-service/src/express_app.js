const express = require("express");
const cors = require("cors");
// const { appEvent } = require("./api");
const HandleErrors = require("./utils/error-handler");

// ***** ROUTES *****
const postRouter = require("./routes/post");

module.exports = async (app) => {
  

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(cors());

  //Listen to Events //
  // appEvent(app);

  // ### Using routes
  app.use("/api/post", postRouter);

  // error handling
  app.use(HandleErrors);
};
