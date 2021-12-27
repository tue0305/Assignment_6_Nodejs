// const CommentService = require("../../services/comment_service");

// const service = new CommentService();
// const {PublishUserEvent, PublishPostEvent} = require("../../utils")


// module.exports.getAllComment = async (req, res, next) => {
//   try {
//     const {postId}  = req.params;
//   // GET PAYLOAD TO SEND USER_SERVICE

//     const { data } = await service.getUserPosts(postId, 'GET_COMMENTS');

//     PublishUserEvent(data)
//     PublishPostEvent(data)
    
//     return res.json(data);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.signIn = async (req, res, next) => {
  
//   try {
//     const { email, password } = req.body;

//     const data = await service.checkSignIn({ email, password });

//     return res.json(data);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports.getUserInfo = async (req, res, next) => {
//   try {
//     const userId =req.userId
    
//     const user = await service.getProfile(userId);
    
//     return res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.forgotPasswordRequest = async (req, res, next) => {
  
//   try {
//     const { email } = req.body;
//     const result = await service.forgotPasswordRequest(email);

//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.resetPassword = async (req, res, next) => {
  
//   try {
//     const { userId, token } = req.params;
//     const { password, confirmPassword } = req.body;

//     const result = await service.resetPassword(password, confirmPassword, userId, token);

//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
