const { CommentPostModel } = require("../database/models");

const {
  STATUS_CODES,
  APIError,
  BadRequestError,
} = require("../utils/app-errors");

class CommentService {
  async createComment(comment) {
    try {
      const { text, userId, postId, parentId } = comment;

      // simple validation
      if (!text || !userId || !postId) {
        return new APIError(
          "Missing email or password!",
          STATUS_CODES.BAD_REQUEST
        );
      }
      const newComment = new CommentPostModel(comment);

      await newComment.save();
      return {
        success: true,
        status: STATUS_CODES.OK,
        data: newComment,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        error.message
      );
    }
  }

  // ===========================
  async getCommentPayload(userId, event) {
    const user = await UserModel.findById(userId);

    if (user) {
      const payload = {
        event: event,
        data: { user },
      };
      return payload;
    } else {
      return new APIError("No post available!", STATUS_CODES.INTERNAL_ERROR);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    // const { userId, postId } = data;

    switch (event) {
      // Subcribe post-service
      case "REMOVE_POST":
        removePostOfUser(userId, postId);
        break;
      case "ADD_POST":
        addPostToUser(userId, postId);
        break;
      case "UPDATE_POST":
        updatePostToUser(userId, postId);
        break;
      case "GET_POSTS":
        getUserCreatedPosts(userId);
        break;

      // Subcribe user-service
      case "GET_POSTS":
        getUserCreatedPosts(userId);
        break;
      case "GET_POSTS":
        getUserCreatedPosts(userId);
        break;
      case "GET_POSTS":
        getUserCreatedPosts(userId);
        break;
      default:
        break;
    }
  }
}

module.exports = CommentService;
