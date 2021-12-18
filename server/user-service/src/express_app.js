const express = require('express');
const cors  = require('cors');
const { user, appEvent } = require('./api/index');
const HandleErrors = require('./utils/error-handler')


module.exports = async (app) => {

    app.use(express.json({ limit: '25mb'}));
    app.use(express.urlencoded({ extended: true, limit: '25mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //Listen to Events //
    // appEvent(app);

    //api
    // user(app);

    // error handling
    app.use(HandleErrors);
    
}