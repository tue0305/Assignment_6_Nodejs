const CommentService = require("../../services/comment_service");

const { USER_BINDING_KEY, POST_BINDING_KEY } = require("../../config/config");
const verifyToken = require("../middlewares");
const { publishMessage, subscribeMessage } = require("../../utils");

module.exports = (app, channel) => {
  const service = new CommentService();
  subscribeMessage(channel, service);

  // @route GET /comment
  // @des Get all comments by postId
  // @access Public
  app.get("/:postId/comment-post", verifyToken, "");

  // @route POST /comment/signup
  // @desc signup comment
  // @access Public
  app.post("/:postId/create", verifyToken, async (req, res, next) => {
    try {
      const { text, userId, parentId } = req.body;
      const { postId } = req.params;

      const data = await service.createComment({
        text,
        userId,
        postId,
        parentId,
      });
      const payload = await service.getCommentPayload(
        data.userId,
        "ADD_COMMENT"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // @route POST /comment/login
  // @desc Login comment
  // @access Public
  app.post(`/signin`, "");

  // @route POST /comment/forgot-password
  // @des send reset password's to comment's email
  // @access Public
  app.post("/forgot-password", "");

  // @route POST /comment/reset-password
  // @des Reset password with userId and forgot password's token generate in comment's email
  // @access Public
  app.post("/reset-password/:userId/:token", "");
  //   const { newPassword} = req.body;
};
