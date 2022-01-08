const { CommentPostModel } = require("../database/models");

const {
  STATUS_CODES,
  APIError,
  BadRequestError,
} = require("../utils/app-errors");

class CommentService {
  async getAllComments() {
    try {
      // ***** GET ALL COMMENTS *****
      const comments = await CommentPostModel.find();

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get posts successfully!`,
        comments: comments,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async getCommentByPostId(postId) {
    try {
      // ***** GET ALL COMMENTS BY CATEGORY*****
      const comments = await CommentPostModel.find({ postId: postId });
      if (!comments) {
        return {
          status: 400,
          success: false,
          message: `This category don't have any post!`,
        };
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get ${postId}'s comments successfully!`,
        data: comments,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async createComment(comment) {
    try {
      const { text, userId, postId, parentId } = comment;

      // simple validation
      if (!text || !userId || !postId) {
        return new APIError("Missing Information!", STATUS_CODES.BAD_REQUEST);
      }
      const newComment = new CommentPostModel(comment);

      await newComment.save();
      return {
        success: true,
        status: STATUS_CODES.OK,
        message: `Create  comment ${newComment.text}  successfully!`,
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

  async updateComment(comment) {
    try {
      const { commentId, text, userId, postId } = comment;

      // simple validation
      if (!commentId || !text || !userId || !postId) {
        return new APIError("Missing information!", STATUS_CODES.BAD_REQUEST);
      }
      const postUpdateConditions = {
        _id: commentId,
        postId: postId,
        userId: userId,
      };
      const updateComment = await CommentPostModel.findOneAndUpdate(
        postUpdateConditions,
        { text: text },
        { new: true }
      );
      if (!updateComment) {
        return new APIError(
          "User not authorized to update or comment not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }

      return {
        success: true,
        status: STATUS_CODES.OK,
        message: `Update post ${updateComment._id} successfully!`,
        data: updateComment,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        error.message
      );
    }
  }

  async deleteComment(comment) {
    try {
      const { commentId, userId, postId } = comment;

      // simple validation
      if (!commentId  || !userId || !postId) {
        return new APIError("Missing information!", STATUS_CODES.BAD_REQUEST);
      }
      const postDeleteConditions = {
        _id: commentId,
        postId: postId,
        userId: userId,
      };
      const deleteComment = await CommentPostModel.findOne(
        postDeleteConditions
      );

      if (!deleteComment) {
        return new APIError(
          "User not authorized to update or comment not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }
      await CommentPostModel.findOneAndDelete(postDeleteConditions);

      return {
        success: true,
        status: STATUS_CODES.OK,
        message: `Delete comment ${deleteComment._id} successfully!`,
        data: deleteComment,
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
  async getCommentPayload(comment, event) {
    try {
      if (comment) {
        const payload = {
          event: event,
          data: { comment },
        };
        return payload;
      } else {
        return new APIError(
          "No comment available!",
          STATUS_CODES.INTERNAL_ERROR
        );
      }
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        error.message
      );
    }
  }

  async SubscribeEvents(payload) {
    try {
      const { event, data } = payload;
    payload.JSON.parse(payload);
    // const { userId, postId } = data;

    switch (event) {
      // Subscribe post-service
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

      // Subscribe user-service
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
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }
}

module.exports = CommentService;
