const UserService = require('../services/user_service');

module.exports = (app) => {

    const service = new UserService();

<<<<<<< HEAD
    app.use('/app-events', async (req,res,next) => {
=======
    app.use('/api/user/app-events', async (req,res,next) => {
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

        const { payload } = req.body;

        service.SubscribeEvents(payload);

<<<<<<< HEAD
        console.log("===============  User Service Received Event ====== ");
=======
        console.log("===============  Customer Service Received Event ====== ");
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
        return res.status(200).json(payload);

    });

}