const express = require(`express`);
const router = express.Router();
const { verifyToken, CommentController} = require('../api')



  

//   try {
//     // ### Find comment by id in params
//     const comment = await comment.findById(req.params.userId);
//     if (!comment)
//       return res.status(400).json({
//         success: false,
//         message: `Invalid link or expired token!`,
//       }); 
    
//     const token = await Token.findOne({
//       userId: comment._id,
//       token: req.params.token
//     })
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid link or expired token!`,
//       }); 
//     }

//     // ### Update new password
//     comment.password = await argon2.hash(newPassword);
//     await comment.save()

//     // ### delete reset password's token
//     await token.delete()

//     // ***** Reset password succeed *****
//     res.json({
//       status: 200,
//       success: true,
//       message: `Reset password account ${comment.email}`,
//       userId: comment._id
//     });

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: `Internal server error` });
//   }
  
// })


module.exports = router;
