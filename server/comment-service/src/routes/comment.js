// const express = require(`express`);
// const router = express.Router();
// const { verifyToken, CommentController} = require('../api')

// // @route GET api/comment
// // @des Get all comments by postId 
// // @access Public
// router.get('/:postId', verifyToken, CommentController.getAllComments );



// // @route POST api/comment/signup
// // @desc signup comment
// // @access Public
// router.post('/:postId',verifyToken,  CommentController.addCommentToPost );

// // @route POST api/comment/login
// // @desc Login comment
// // @access Public
// router.post(`/signin`, CommentController.signIn);


// // @route POST api/comment/forgot-password
// // @des send reset password's to comment's email
// // @access Public
// router.post('/forgot-password', CommentController.forgotPasswordRequest);


// // @route POST api/comment/reset-password
// // @des Reset password with userId and forgot password's token generate in comment's email
// // @access Public
// router.post('/reset-password/:userId/:token', CommentController.resetPassword); 
// //   const { newPassword} = req.body;

  

// //   try {
// //     // ### Find comment by id in params
// //     const comment = await comment.findById(req.params.userId);
// //     if (!comment)
// //       return res.status(400).json({
// //         success: false,
// //         message: `Invalid link or expired token!`,
// //       }); 
    
// //     const token = await Token.findOne({
// //       userId: comment._id,
// //       token: req.params.token
// //     })
// //     if (!token) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Invalid link or expired token!`,
// //       }); 
// //     }

// //     // ### Update new password
// //     comment.password = await argon2.hash(newPassword);
// //     await comment.save()

// //     // ### delete reset password's token
// //     await token.delete()

// //     // ***** Reset password succeed *****
// //     res.json({
// //       status: 200,
// //       success: true,
// //       message: `Reset password account ${comment.email}`,
// //       userId: comment._id
// //     });

// //   } catch (error) {
// //     console.log(error.message);
// //     res.status(500).json({ success: false, message: `Internal server error` });
// //   }
  
// // })


// module.exports = router;
