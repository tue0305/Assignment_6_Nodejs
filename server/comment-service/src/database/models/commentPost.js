const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentPost = new Schema(
  {
    text: {
      type: String,
      require: true,
    },

    userId: {
      type: String,
      require: true,
    },

    postId: {
      type: String,
      require: true,
    },

    parentId: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("comment_post", CommentPost);
