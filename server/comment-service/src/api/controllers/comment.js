const CommentService = require("../../services/comment_service");

const { USER_BINDING_KEY, POST_BINDING_KEY } = require("../../config/config");
const verifyToken = require("../middlewares/auth");
const { publishMessage, subscribeMessage } = require("../../utils");

module.exports = (app, channel) => {
  const service = new CommentService();
  subscribeMessage(channel, service);
  
// ================= START POST COMMENT =================
  // @route GET /get-all-post-comments
  // @des Get all post comments
  // @access Public
  app.get("/get-all-post-comments", async (req, res, next) => {
    try {
      const { postId } = req.params;

      const result = await service.getAllComments();
      

      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

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

  // @route PUT /:postId/comment/:commentId
  // @desc edit post comment
  // @access Public
  app.put(`/:postId/comment/:commentId`, verifyToken, async (req, res, next) => {
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

  // @route DELETE /:postId/comment/:commentId
  // @des remove post comment
  // @access Public
  app.delete("/:postId/comment/:commentId", verifyToken, async (req, res, next) => {
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
// =======================END POST COMMENT =================
  
// ================= START HIGHLIGHT COMMENT =================
  // @route GET /get-all-highlight-comments
  // @des Get all post highlight comments
  // @access Public
  app.get("/get-all-highlight-comments", async (req, res, next) => {
    try {
      const { postId } = req.params;

      const result = await service.getAllHighlightComments();
      

      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route GET /:postId/highlight-comment
  // @des Get all highlight comments by postId
  // @access Public
  app.get("/:postId/highlight-comment", async (req, res, next) => {
    try {
      const { postId } = req.params;

      const result = await service.getHighlightCommentByPostId(postId);
      const payload = await service.getCommentPayload(
        result.data,
        "GET_HIGHLIGH_COMMENTS"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route POST /:postId/create-highlight-comment
  // @desc create post highlight comment
  // @access Public
  app.post("/:postId/create-highlight-comment", verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;

      const { text, parentId, _id, highlight_text } = req.body;
      const { postId } = req.params;

      const result = await service.createHighlightComment({
        _id,
        highlight_text,
        text,
        userId,
        postId,
        parentId,
      });
      const payload = await service.getCommentPayload(
        result.data,
        "ADD_HIGHLIGHT_COMMENT"
      );
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route PUT /:postId/highlight/:commentId
  // @desc edit post highlight comment
  // @access Public
  app.put(`/:postId/highlight/:commentId`, verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;

      const { text, parentId } = req.body;
      const { postId, commentId } = req.params;

      const result = await service.updateHighlightComment({
        commentId,
        text,
        userId,
        postId,
      });
      const payload = await service.getCommentPayload(
        result.data,
        "UPDATE_HIGHLIGHT_COMMENT"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // @route DELETE /:postId/highlight/:commentId
  // @des remove post comment
  // @access Public
  app.delete("/:postId/highlight/:commentId", verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;
      const { postId, commentId } = req.params;

      const result = await service.deleteHighlightComment({
        commentId,
        userId,
        postId,
      });
      const payload = await service.getCommentPayload(
        result.data,
        "REMOVE_HIGHLIGHT_COMMENT"
      );

      publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
      publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });
// =======================END HIGHLIGHT COMMENT =================

  
};
