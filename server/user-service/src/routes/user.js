const express = require(`express`);
const router = express.Router();
const { verifyToken, UserController } = require('../api');
const {authorize} = require('../api/middlewares/authorize');
// @route GET api/user
// @des Check if user is logged in
// @access Public
router.get('/profile', verifyToken, UserController.getUserInfo);

// @route POST api/user/signup
// @desc signup user
// @access Public
router.post('/signup', UserController.signUp);

// @route POST api/user/login
// @desc Login user
// @access Public
router.post(`/signin`, UserController.signIn);


// @route POST api/user/forgot-password
// @des send reset password's to user's email
// @access Public
router.post('/forgot-password', UserController.forgotPasswordRequest);


// @route POST api/user/reset-password
// @des Reset password with userId and forgot password's token generate in user's email
// @access Public
router.post('/reset-password/:userId/:token', UserController.resetPassword);
//   const { newPassword} = req.body;

// @route POST api/user/delete-user/:userId
// @access Public
router.delete('/delete-user/:userId',  UserController.deleteUser);


// @route POST api/user/update-user/:userId
// @access Public
router.put('/update-user/:userId',  UserController.updateUser);


// @route POST api/user/get-all-users
// @access Public
router.get('/get-all-users', verifyToken, authorize(["ADMIN"]),  UserController.getUser);





















//   try {
//     // ### Find user by id in params
//     const user = await User.findById(req.params.userId);
//     if (!user)
//       return res.status(400).json({
//         success: false,
//         message: `Invalid link or expired token!`,
//       }); 

//     const token = await Token.findOne({
//       userId: user._id,
//       token: req.params.token
//     })
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid link or expired token!`,
//       }); 
//     }

//     // ### Update new password
//     user.password = await argon2.hash(newPassword);
//     await user.save()

//     // ### delete reset password's token
//     await token.delete()

//     // ***** Reset password succeed *****
//     res.json({
//       status: 200,
//       success: true,
//       message: `Reset password account ${user.email}`,
//       userId: user._id
//     });

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: `Internal server error` });
//   }

// })


module.exports = router;
