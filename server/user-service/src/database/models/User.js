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
    require: true,
    default: ROLE[1],
  },


  createdAt: {
    type: Date,
    default: Date.now,
  },
  created_posts: [
    { 
        _id: { type: String, require: true }
    },
  ],
},
{timestamp:true});

module.exports = mongoose.model("users", UserSchema);
