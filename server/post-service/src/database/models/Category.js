const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,

    required: true,
  },
  image: {
    type: String,
    default: null,
  },

  posts: [
    {
      _id: {
        type: Schema.Types.ObjectId,

        ref: "posts",
      },

      title: {
        type: String,
      },

      image: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("categories", CategorySchema);
