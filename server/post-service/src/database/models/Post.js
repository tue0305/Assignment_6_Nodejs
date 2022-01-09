const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    content: {
      type: String,
      require: true,
    },

    gradients: [
      {
        name: { type: String },
      },
    ],

    category: {
      _id:{
        type: Schema.Types.ObjectId,
      ref: "categories",
        
      },
      title: String
    },

    userId: {
      type: String,
      require: true,
    },
    post_comments: [
      {
        _id: { type: String, require: true },
      },
    ],

    post_highlight_comments: [
      {
        _id: { type: String, require: true },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("posts", PostSchema);
