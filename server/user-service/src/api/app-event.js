const UserService = require('../services/user_service');

module.exports = (app) => {

    const service = new UserService();

    app.use('/api/user/app-events', async (req,res,next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log("===============  Customer Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}