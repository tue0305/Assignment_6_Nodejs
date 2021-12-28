const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  comment: {
    type: String,
    required: true,
    maxlength: 5000
  },
  parent_id: {
    type: String,
    default: null,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model("comments", Comment);
