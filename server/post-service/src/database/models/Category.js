const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
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

      }
    }
  ],
});

module.exports = mongoose.model("categories", CategorySchema);
