const { CommentModel } = require("../database/models");
const {
  validatePassword,
  generatePassword,
  generateSignature,
  sendEmail,
} = require("../utils");

const {
  STATUS_CODES,
  APIError,
  BadRequestError,
} = require("../utils/app-errors");

class CommentService {
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
