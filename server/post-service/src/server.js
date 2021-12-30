const express = require("express");
const { PORT } = require("./config/config");
const { DB_Connection } = require("./database/index");
const expressApp = require("./express_app");
const crawlData = require("./Crawler/index");
const StartServer = async () => {
    const app = express();

    await DB_Connection();
    await crawlData();
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    }).on("error", (err) => {
        console.log(err);
        process.exit();
    });
};

StartServer();
