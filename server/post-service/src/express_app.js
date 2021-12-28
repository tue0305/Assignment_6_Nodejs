const express = require("express");
const cors = require("cors");
const { appEvent } = require("./api");
const HandleErrors = require("./utils/error-handler");

// ***** ROUTES *****
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");

module.exports = async (app) => {
  

  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));
  app.use(cors());

  //Listen to Events //
  appEvent(app);

  // ### Using routes
  app.use("/api/post", postRouter);
  app.use("/api/category", categoryRouter);

  // error handling
  app.use(HandleErrors);
};
