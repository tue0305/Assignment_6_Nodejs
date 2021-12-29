const express = require("express");
const cors = require("cors");
// const { appEvent } = require("./api");
const UserController = require("./api/controllers/user")

const HandleErrors = require("./utils/error-handler");

// ***** ROUTES *****
const userRouter = require("./routes/user");



module.exports = async (app) => {
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  // //Listen to Events //
  // appEvent(app);

  // ### Using routes == not done
  app.use("/api/user", userRouter);

  // error handling
  app.use(HandleErrors);
};
