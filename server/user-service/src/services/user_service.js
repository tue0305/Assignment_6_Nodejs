const { UserModel, TokenModel } = require("../database/models");
const {
  validatePassword,
  generatePassword,
  generateSignature,
  sendEmail,
} = require("../utils");
const {
  STATUS_CODES,
  APIError,
  BadRequestError,
} = require("../utils/app-errors");

class UserService {
  async checkSignIn(userInputs) {
    const { email, password } = userInputs;

    // simple validation
    if (!email || !password) {
      return new APIError(
        "Missing email or password!",
        STATUS_CODES.BAD_REQUEST
      );
    }

    try {
      // ### Check if the user exist
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return new APIError("Incorrect email!", STATUS_CODES.BAD_REQUEST);
      }

      // ### Comparing input password and user password.
      const passwordValid = await validatePassword( user.password, password)
      if (!passwordValid) {
        return new APIError("`Incorrect password!", STATUS_CODES.BAD_REQUEST);
      }

      // **** True password and return the access token ****
      const accessToken = await generateSignature({ _id: user._id });

      return {
        status: 200,
        success: true,
        message: `Login successfully!`,
        userId: user._id,
        accessToken,
      };
    } catch (err) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        err.message
      );
    }
  }

  async createUser(userInputs) {
    const { email, password } = userInputs;

    // simple validation
    if (!email || !password) {
      return new APIError(
        "Missing email or password!",
        STATUS_CODES.BAD_REQUEST
      );
    }

    try {
      const userModel = await UserModel.findOne({ email: email });
      // ***** UserModel existed *****
      if (userModel) {
        return new APIError("Email already taken!", STATUS_CODES.BAD_REQUEST);
      }

      // ***** New userModel *****

      let userPassword = await generatePassword(password);

      const newUser = new UserModel({
        email: email,
        password: userPassword,
      });

      await newUser.save();

      const token = await generateSignature({ _id: newUser._id });

      return {
        success: true,
        status: STATUS_CODES.OK,
        userId: newUser._id,
        token,
      };
    } catch (err) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        err.message
      );
    }
  }

  async getProfile(id) {
    try {
      const user = await UserModel.findById(id).select(`-password`);

      if (!user) return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);

      return user;
    } catch (err) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.UN_AUTHORIZED,
        err.message
      );
    }
  }

  async forgotPasswordRequest(email) {
    // **** Simple validation ****
    if (!email) {
      return new APIError("Email missing!", STATUS_CODES.BAD_REQUEST);
    }

    try {
      //check existing user
      const user = await UserModel.findOne({ email: email });
      if (!user)
        return new APIError("Incorrect email!", STATUS_CODES.BAD_REQUEST);

      let token = await TokenModel.findOne({ userId: user._id });
      if (!token) {
        token = await new TokenModel({
          userId: user._id,
          token: await generateSignature({ _id: user._id }),
        }).save();
      }

      // ### Generate link reset password and send to user's email
      const resetLink = `${process.env.BASE_URL}/user/reset-password/${user._id}/${token.token}`;
      await sendEmail(user.email, "reset-password", resetLink);

      // **** Send forgot password request  succeed ****
      return {
        status: 200,
        success: true,
        message: `Reset password link sent to your email ${user.email} account. Please check to reset password!`,
        userId: user._id,
        token,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.UN_AUTHORIZED,
        error.message
      );
    }
  }
  async resetPassword(password, confirmPassword, userId, resetPasswordToken) {
    // Simple validation
    if (password !== confirmPassword) {
      return new APIError("Password does not match!", STATUS_CODES.BAD_REQUEST);
    }
    try {
      // ### Find user by id in params
      const user = await UserModel.findById(userId);
      if (!user)
        return new APIError("Invalid link or expired token!", STATUS_CODES.BAD_REQUEST);
    
      const token = await TokenModel.findOne({
        userId: user._id,
        token: resetPasswordToken
      })
      if (!token) {
        return new APIError("Invalid link or expired token!", STATUS_CODES.BAD_REQUEST);
      }

      // ### Update new password
      user.password = await generatePassword(password);
      await user.save()

      // ### delete reset password's token
      await token.delete()

      // ***** Reset password succeed *****
      return {
        status: 200,
        success: true,
        message: `Reset password account ${user.email} success!`,
        userId: user._id
      };

    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.UN_AUTHORIZED,
        error.message
      );
    }
  }
}

module.exports = UserService;
