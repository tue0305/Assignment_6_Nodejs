const UserService = require("../../services/user_service");
const { publishMessage, subscribeMessage } = require("../../utils");
const {
  POST_BINDING_KEY,
  COMMENT_BINDING_KEY,
} = require("../../config/config");
const verifyToken = require("../middlewares/auth");

module.exports = async (app, channel) => {
  const service = new UserService();
  subscribeMessage(channel, service)


  try {

    // @route GET api/user
    // @des Check if user is logged in
    // @access Public
    app.get("/profile", verifyToken, async (req, res, next) => {
      try {
        const userId = req.userId;

        const user = await service.getProfile(userId);

        return res.json(user);
      } catch (error) {
        next(error);
      }
    });

    // @route POST api/user/signup
    // @desc signup user
    // @access Public
    app.post("/signup", async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const data = await service.createUser({ email, password });
        const payload = await service.getUserPayload(data.userId, "ADD_USER");

        publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
        publishMessage(channel, COMMENT_BINDING_KEY, JSON.stringify(payload));
        return res.json(data);
      } catch (err) {
        next(err);
      }
    });

    // @route POST api/user/login
    // @desc Login user
    // @access Public
    app.post(`/signin`, async (req, res, next) => {
      try {
        const { email, password } = req.body;

        const data = await service.checkSignIn({ email, password });

        return res.json(data);
      } catch (err) {
        next(err);
      }
    });

    // @route POST api/user/forgot-password
    // @des send reset password's to user's email
    // @access Public
    app.post("/forgot-password", async (req, res, next) => {
      try {
        const { email } = req.body;
        const result = await service.forgotPasswordRequest(email);

        return res.json(result);
      } catch (error) {
        next(error);
      }
    });

    // @route POST api/user/reset-password
    // @des Reset password with userId and forgot password's token generate in user's email
    // @access Public
    app.post("/reset-password/:userId/:token", async (req, res, next) => {
      try {
        const { userId, token } = req.params;
        const { password, confirmPassword } = req.body;

        const result = await service.resetPassword(
          password,
          confirmPassword,
          userId,
          token
        );

        return res.json(result);
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
