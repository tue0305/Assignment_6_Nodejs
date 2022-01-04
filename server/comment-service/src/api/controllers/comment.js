// const CommentService = require("../../services/comment_service");

// const { USER_BINDING_KEY, POST_BINDING_KEY } = require("../../config/config");
// const verifyToken = require("../middlewares/auth");
// const { publishMessage, subscribeMessage } = require("../../utils");

// module.exports = (app, channel) => {
//   const service = new CommentService();

//   // @route GET api/comment
//   // @des Get all comments by postId
//   // @access Public
//   app.get("/:postId", verifyToken, "");

//   // @route POST api/comment/signup
//   // @desc signup comment
//   // @access Public
//   app.post("/:postId", verifyToken, "");

//   // @route POST api/comment/login
//   // @desc Login comment
//   // @access Public
//   app.post(`/signin`, "");

//   // @route POST api/comment/forgot-password
//   // @des send reset password's to comment's email
//   // @access Public
//   app.post("/forgot-password", "");

//   // @route POST api/comment/reset-password
//   // @des Reset password with userId and forgot password's token generate in comment's email
//   // @access Public
//   app.post("/reset-password/:userId/:token", "");
//   //   const { newPassword} = req.body;
// };
