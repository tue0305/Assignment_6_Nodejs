const CommentService = require("../../services/comment_service");

const { USER_BINDING_KEY, POST_BINDING_KEY } = require("../../config/config");
const verifyToken = require("../middlewares/auth");
const { publishMessage, subscribeMessage } = require("../../utils");

module.exports = (app, channel) => {
  const service = new CommentService();
  subscribeMessage(channel, service);

  // @route GET /:postId/comment-pos
  // @des Get all comments by postId
  // @access Public
  app.get("/:postId/comment-post", async (req, res, next) => {
    try {
      const { postId } = req.params;

      const result = await service.getCommentByPostId(postId);
      const payload = await service.getCommentPayload(
        result.data,
        "GET_COMMENTS"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route POST /:postId/create-comment
  // @desc create post comment
  // @access Public
  app.post("/:postId/create-comment", verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;

      const { text, parentId } = req.body;
      const { postId } = req.params;

      const result = await service.createComment({
        text,
        userId,
        postId,
        parentId,
      });
      const payload = await service.getCommentPayload(
        result.data,
        "ADD_COMMENT"
      );
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route PUT /:postId/:commentId
  // @desc edit post comment
  // @access Public
  app.put(`/:postId/:commentId`, verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;

      const { text, parentId } = req.body;
      const { postId, commentId } = req.params;

      const result = await service.updateComment({
        commentId,
        text,
        userId,
        postId,
      });
      const payload = await service.getCommentPayload(
        result.data,
        "UPDATE_COMMENT"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route DELETE /:postId/:commentId
  // @des remove post comment
  // @access Public
  app.delete("/:postId/:commentId", verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;
      const { postId, commentId } = req.params;

      const result = await service.deleteComment({
        commentId,
        userId,
        postId,
      });
      const payload = await service.getCommentPayload(
        result.data,
        "REMOVE_COMMENT"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route POST /comment/reset-password
  // @des Reset password with userId and forgot password's token generate in comment's email
  // @access Public
  // app.post("/reset-password/:userId/:token", "");
  //   const { newPassword} = req.body;
};
