const express = require("express");
const { PORT } = require("./config/config");
const { DB_Connection } = require("./database/index");
const expressApp = require("./express_app");
const { createChannel } = require("./utils");
const crawlData = require("./crawler/index");

const StartServer = async () => {
  const app = express();

  await DB_Connection();

  // await crawlData();

  const channel = await createChannel();

  await expressApp(app, channel);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
