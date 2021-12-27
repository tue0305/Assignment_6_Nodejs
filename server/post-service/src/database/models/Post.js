const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
<<<<<<< HEAD
   
=======
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
<<<<<<< HEAD
      default: null
=======
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
    },

    content: {
      type: String,
      require: true,
    },

    gradients: [
      {
<<<<<<< HEAD
        name: { type: String }
    
=======
        name: { type: String, require: true },
        quantity: { type: String, require: true },
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
