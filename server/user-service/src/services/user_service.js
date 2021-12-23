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
      const passwordValid = await validatePassword(user.password, password);
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
        return new APIError(
          "Invalid link or expired token!",
          STATUS_CODES.BAD_REQUEST
        );

      const token = await TokenModel.findOne({
        userId: user._id,
        token: resetPasswordToken,
      });
      if (!token) {
        return new APIError(
          "Invalid link or expired token!",
          STATUS_CODES.BAD_REQUEST
        );
      }

      // ### Update new password
      user.password = await generatePassword(password);
      await user.save();

      // ### delete reset password's token
      await token.delete();

      // ***** Reset password succeed *****
      return {
        status: 200,
        success: true,
        message: `Reset password account ${user.email} success!`,
        userId: user._id,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.UN_AUTHORIZED,
        error.message
      );
    }
  }

  // ***** SUBSCRIBE EVENTS  *****
  async addPostToUser(userId, _id) {
    const post = { _id };
    try {
      const user = await UserModel.findById(userId).populate("created_posts");
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }
      user.created_posts.push(post);

      await user.save();

      return {
        status: 200,
        success: true,
        message: `Add post to user success!`,
        created_posts: user.created_posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async removePostOfUser(userId, _id) {
    const post = { _id };
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }

      if (user.created_posts.length > 0) {
        user.created_posts.map((post) => {
          if (post._id.toString() === post._id.toString()) {
            const index = user.created_posts.indexOf(post);
            user.created_posts.splice(index, 1);
          } else {
            return new APIError("Post doesn't exist!", STATUS_CODES.NOT_FOUND);
          }
        });
        await user.save();
        return {
          status: 200,
          success: true,
          message: `Remove post ${post} success!`,
          created_posts: user.created_posts,
        };
      } else {
        return new APIError(
          "User doesn't have any posts!",
          STATUS_CODES.NOT_FOUND
        );
      }
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async updatePostToUser(userId, _id) {
    const post = { _id };
    try {
      const user = await UserModel.findById(userId).populate("created_posts");
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }
      if (user.created_posts.length > 0) {
        user.created_posts.map((post) => {
          if (post._id.toString() === post._id.toString()) {
            return {
              status: 200,
              success: true,
              message: `update post ${post} success!`,
              updated_posts: post,
            };
          } else {
            return new APIError("Post doesn't exist!", STATUS_CODES.NOT_FOUND);
          }
        });
      } else {
        return new APIError(
          "User doesn't have any posts!",
          STATUS_CODES.NOT_FOUND
        );
      }
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }
  async getUserCreatedPosts(userId) {
    try {
      const user = await UserModel.findById(userId).populate("created_posts");
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }

      return {
        status: 200,
        success: true,
        message: `Get posts success!`,
        created_posts: user.created_posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { userId, postId } = data;

    switch (event) {
      case "TEST":
        console.log("Subcribe!", data)
        break;
      case "REMOVE_POST":
        removePostOfUser(userId, postId);
        break;
      case "ADD_POST":
        addPostToUser(userId, postId);
        break;
      case "UPDATE_POST":
        updatePostToUser(userId, postId);
        break;
      case "GET_POST":
        getUserCreatedPosts(userId);
        break;
      default:
        break;
    }
  }
}

module.exports = UserService;
