const express = require("express");
const { PORT } = require("./config/config");
const { DB_Connection } = require("./database/index");
const expressApp = require("./express_app");
const { createChannel } = require("./utils");

const StartServer = async () => {
  try {
    const app = express();

    await DB_Connection();
  
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
  } catch (error) {
      console.log(error.message)
  }
};

StartServer();
