const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR_LINK;

//*************************** Enum *******************/
const ROLE = ["ADMIN", "NORMAL"];

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: DEFAULT_AVATAR,
  },

  role: {
    type: String,
    required: true,
    default: ROLE.NORMAL,
  },

  password: {
    type: "string",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
