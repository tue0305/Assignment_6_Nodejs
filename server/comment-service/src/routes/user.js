const express = require(`express`);
const router = express.Router();
const argon2 = require(`argon2`);
const jwt = require(`jsonwebtoken`);
const verifyToken = require(`../middlewares/auth`);

const User = require(`../models/User`);
const Token = require(`../models/Token`);
const sendEmail = require('../Utils/sendEmail');

// @route GET api/user
// @des Check if user is logged in
// @access Public
router.get(`/`, verifyToken, async (req, res) => {
  // simple validation
  try {
    const user = await User.findById(req.userId).select(`-password`);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: `User not found!` });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});



// @route POST api/user/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: `Missing email or password!`,
    });
  }

  try {
    // #### check existing email
    const user = await User.findOne({ email: email });

    // ***** User existed *****
    if (user)
      return res.status(400).json({
        success: false,
        message: `Email already taken!`,
      });

    // ***** New user *****

    // Using argon2 to hash password
    const hashedPassword = await argon2.hash(password);

    // ### Creating new user
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    // Return access token using json web token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      status: 200,
      success: true,
      message: `User created successfully!`,
      userId: newUser._id,
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route POST api/user/login
// @desc Login user
// @access Public
router.post(`/login`, async (req, res) => {
  const { email, password } = req.body;

  // **** Simple validation ****
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: `Missing email or password!`,
    });
  }
  try {
    //check existing user
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: `Incorrect email!`,
      });

    // ### Comparing input password and user password.
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: `Incorrect password!`,
      });
    }
    // **** True password and return the access token ****
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    // **** Login  succeed ****
    res.json({
      status: 200,
      success: true,
      message: `Login successfully!`,
      userId: user._id,
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});


// @route POST api/user/forgot-password
// @des send reset password's to user's email
// @access Public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // **** Simple validation ****
  if (!email) {
    return res.status(400).json({
      success: false,
      message: `Missing email!`,
    });
  }

  try {
    //check existing user
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: `Incorrect email!`,
      });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET),
      }).save()
    }

    // ### Generate link reset password and send to user's email
    const resetLink = `${process.env.URL_FRONT_END}/user/reset-password/${user._id}/${token.token}`
    await sendEmail(user.email, "reset-password", resetLink)

    // **** Send forgot password request  succeed ****
    res.json({
      status: 200,
      success: true,
      message: `Reset password link sent to your email ${user.email} account. Please check to reset password!`,
      userId: user._id,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
});

// @route POST api/user/reset-password
// @des Reset password with userId and forgot password's token generate in user's email
// @access Public
router.post('/reset-password/:userId/:token', async (req, res) => {
  const { newPassword} = req.body;

  

  try {
    // ### Find user by id in params
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).json({
        success: false,
        message: `Invalid link or expired token!`,
      }); 
    
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    })
    if (!token) {
      return res.status(400).json({
        success: false,
        message: `Invalid link or expired token!`,
      }); 
    }

    // ### Update new password
    user.password = await argon2.hash(newPassword);
    await user.save()

    // ### delete reset password's token
    await token.delete()

    // ***** Reset password succeed *****
    res.json({
      status: 200,
      success: true,
      message: `Reset password account ${user.email}`,
      userId: user._id
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: `Internal server error` });
  }
  
})


module.exports = router;
