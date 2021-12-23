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
    },

    content: {
      type: String,
      require: true,
    },

    gradients: [
      {
        name: { type: String, require: true },
        quantity: { type: String, require: true },
      },
    ],

    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },

    userId: {
      type: String,
      require: true,
    },
    comments: [
      {
        _id: { type: String, require: true },
        text: { type: String, require: true },
        createdAt: {
          type: Date,
        },
        parent_Id: { type: String },
      },
    ],

    highlight_comments: [
      {
        _id: { type: String, require: true },
        highlight_topic: { type: String, require: true },
        text: { type: String, require: true },
        createdAt: {
          type: Date,
        },
        parent_Id: { type: String },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("posts", PostSchema);
