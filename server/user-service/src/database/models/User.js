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
      post: {
        _id: { type: String, require: true }
      }
    },
  ],
<<<<<<< HEAD
},
{timestamp:true});
=======
});
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

module.exports = mongoose.model("users", UserSchema);
