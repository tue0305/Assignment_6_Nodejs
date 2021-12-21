const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR_LINK;

//*************************** Enum *******************/
const ROLE = ["ADMIN", "NORMAL"];

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },


  avatar: {
    type: String,
    default: DEFAULT_AVATAR,
  },

  role: {
    type: String,
    enum: ROLE,
    default: ROLE.NORMAL,
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
  // post_list_create: [
  //   {
  //     post: {
  //       _id: { type: String, require: true },
  //       content: { type: String, require: tru~e },
  //       image: { type: String },
  //       category: { type: String },
  //     },
  //   },
  // ],
});

module.exports = mongoose.model("users", UserSchema);
