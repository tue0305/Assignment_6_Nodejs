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
      default: null
    },

    content: {
      type: String,
      require: true,
    },

    gradients: [
      {
        name: { type: String }
    
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
    post_comments: [
      {
        _id: { type: String, require: true },
      },
    ],

    topic_comments: [
      {
        _id: { type: String, require: true },
      }
    ]
  }, 
  {timestamp:true}
  
);

module.exports = mongoose.model("posts", PostSchema, "posts");
