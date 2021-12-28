const PostService = require("../services/post_service");

module.exports = (app) => {
  const service = new PostService();

  app.use("/app-events", async (req, res, next) => {
    try {
      const { payload } = req.body;

      service.SubscribeEvents(payload);

      console.log("===============  Post Service Received Event ====== ");
      return res.status(200).json(payload);
    } catch (error) {
      console.log(error.message);
    }
  });
};
