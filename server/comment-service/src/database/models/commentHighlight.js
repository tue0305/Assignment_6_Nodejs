const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentHighlight = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      require: true,
    },

    highlight_text: { type: String },

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
  { timestamp: true, _id: false }
);

module.exports = mongoose.model("comment_highlight", CommentHighlight);
