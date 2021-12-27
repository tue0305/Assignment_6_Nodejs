const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const { appEvent } = require("./api");
=======
// const { appEvent } = require("./api");
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
const HandleErrors = require("./utils/error-handler");

// ***** ROUTES *****
const postRouter = require("./routes/post");
<<<<<<< HEAD
const categoryRouter = require("./routes/category");
=======
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

module.exports = async (app) => {
  

<<<<<<< HEAD
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));
  app.use(cors());

  //Listen to Events //
  appEvent(app);

  // ### Using routes
  app.use("/api/post", postRouter);
  app.use("/api/category", categoryRouter);
=======
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));
  app.use(cors());

  //Listen to Events //
  // appEvent(app);

  // ### Using routes
  app.use("/api/post", postRouter);
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

  // error handling
  app.use(HandleErrors);
};
