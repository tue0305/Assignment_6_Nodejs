const {
  CommentPostModel,
  CommentHighlightModel,
} = require("../database/models");

const {
  STATUS_CODES,
  APIError,
  BadRequestError,
} = require("../utils/app-errors");

class CommentService {
  // ================= START POST COMMENT =========================
  async getAllComments() {
    try {
      // ***** GET ALL COMMENTS *****
      const comments = await CommentPostModel.find();

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get comments successfully!`,
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

  async getCommentByPostId(postId) {
    try {
      // ***** GET ALL COMMENTS BY POST_ID*****
      const comments = await CommentPostModel.find({ postId: postId });

      if (!comments) {
        return {
          status: 400,
          success: false,
          message: `This post don't have any comment!`,
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
      if (!commentId || !userId || !postId) {
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

  // ================= END POST COMMENT =========================
  // ================= START HIGHLIGHT COMMENT =========================
  async getAllHighlightComments() {
    try {
      // ***** GET ALL COMMENTS *****
      const commentHighlights = await CommentHighlightModel.find();

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get all highlight comments successfully!`,
        data: commentHighlights,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async getHighlightCommentByPostId(postId) {
    try {
      // ***** GET HIGHLIGHT COMMENTS BY POST ID *****

      const commentHighlights = await CommentHighlightModel.find({
        postId: postId,
      });

      if (!commentHighlights) {
        return {
          status: 400,
          success: false,
          message: `This post don't have any highlight comment!`,
        };
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get ${postId}'s comments successfully!`,
        data: commentHighlights,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async createHighlightComment(comment) {
    try {
      const { _id, highlight_text, text, userId, postId, parentId } = comment;

      // simple validation
      if (!text || !userId || !postId) {
        return new APIError("Missing Information!", STATUS_CODES.BAD_REQUEST);
      }
      const newComment = new CommentHighlightModel(comment);

      await newComment.save();
      return {
        success: true,
        status: STATUS_CODES.OK,
        message: `Create highlight comment ${newComment.text}  successfully!`,
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

  async updateHighlightComment(comment) {
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
      const updateComment = await CommentHighlightModel.findOneAndUpdate(
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

  async deleteHighlightComment(comment) {
    try {
      const { commentId, userId, postId } = comment;

      // simple validation
      if (!commentId || !userId || !postId) {
        return new APIError("Missing information!", STATUS_CODES.BAD_REQUEST);
      }
      const postDeleteConditions = {
        _id: commentId,
        postId: postId,
        userId: userId,
      };
      const deleteComment = await CommentHighlightModel.findOne(
        postDeleteConditions
      );

      if (!deleteComment) {
        return new APIError(
          "User not authorized to update or comment not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }
      await CommentHighlightModel.findOneAndDelete(postDeleteConditions);

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

  // ================= END POST COMMENT =========================
  async removePostOfComments(post) {
    try {
      const comments = await CommentPostModel.find({ postId: post._id });
      const highlight_comments = await CommentHighlightModel.find({
        postId: post._id,
      });
      if (comments) {
        await CommentPostModel.deleteMany({ postId: post._id });
      }
      if (highlight_comments) {
        await CommentHighlightModel.deleteMany({ postId: post._id });
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Remove -comment: ${comments} \n\t -highlight comment: ${highlight_comments}   success!`,
        user: user,

        created_posts: user.created_posts,
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
      payload = JSON.parse(payload);
      const { event, data } = payload;

      const { userId, post } = data;

      switch (event) {
        // Subscribe post-service
        case "REMOVE_POST":
          this.removePostOfComments(post);
          break;

        case "UPDATE_POST":
          this.updatePostToUser(userId, post);
          break;
        case "GET_POST":
          this.getUserCreatedPosts(userId);
          break;

        // Subscribe user-service
        // case "GET_POSTS":
        //   getUserCreatedPosts(userId);
        //   break;
        // case "GET_POSTS":
        //   getUserCreatedPosts(userId);
        //   break;
        // case "GET_POSTS":
        //   getUserCreatedPosts(userId);
        //   break;
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
