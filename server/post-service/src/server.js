const express = require('express');
const { PORT } = require('./config/config');
const { DB_Connection } = require('./database/index');
const expressApp = require('./express_app');

        // SETUP UPLOAD FILE 
const path = require('path');
const app = express();
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));
app.use('/public',express.static('public'));
        // END SETUP UPLOAD FILE 

const StartServer = async() => {

    const app = express();
    
    await DB_Connection();
    
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();