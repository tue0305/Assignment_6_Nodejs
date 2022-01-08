const { UserModel, TokenModel } = require("../database/models");
const {
  validatePassword,
  generatePassword,
  generateSignature,
  sendEmail,
  checkEmail,
  checkPassword
} = require("../utils");
const gravatarUrl = require('gravatar');
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
        status: STATUS_CODES.OK,
        success: true,
        message: `Login successfully!`,
        role: user.role,
        userId: user._id,
        accessToken,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        error.message
      );
    }
  }

  async createUser(userInputs) {
    const { email, password, role, file } = userInputs;

    // simple validation
    if (!email || !password) {
      return new APIError(
        "Missing email or password!",
        STATUS_CODES.BAD_REQUEST
      );
    }

    // check email
    const emailValid = await checkEmail(email);
    if (!emailValid) {
      return new APIError("The email must email address!", STATUS_CODES.BAD_REQUEST);
    };

    //check password
    const passwordValid = await checkPassword(password);
    if(!passwordValid){
      return new APIError("The password must contain at least 8  characters including at least 1 uppercase, 1 lowercase, one digit.", STATUS_CODES.BAD_REQUEST);
    }

    try {
      const userModel = await UserModel.findOne({ email: email });
      // ***** UserModel existed *****
      if (userModel) {
        return new APIError("Email already taken!", STATUS_CODES.BAD_REQUEST);
      }

      // ***** New userModel ****
      
      const emailAvatar = gravatarUrl.url(email);
      const urlImage = file ?`http://localhost:8001/${file.path}` : emailAvatar;



      let userPassword = await generatePassword(password);

      const newUser = new UserModel({
        email: email,
        password: userPassword,
        role: role,
        avatar: urlImage
      });

      await newUser.save();

      const token = await generateSignature({ _id: newUser._id });

      return {
        success: true,
        status: STATUS_CODES.OK,
        userId: newUser._id,
        token,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.BAD_REQUEST,
        error.message
      );
    }
  }

  async getProfile(id) {
    try {
      const user = await UserModel.findById(id).select(`-password`);
      
      if (!user) return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);

      return user;
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.UN_AUTHORIZED,
        error.message
      );
    }
  }

  async deleteUser(userId){
    try {
      const deleteUser = await UserModel.findById(userId);
      await UserModel.findOneAndDelete({userId});
     
      return{
        status: 200,
        success: true,
        message: `Delete account ${userId} success!`,
        deleteUser: deleteUser
      }
    }
    catch(err){
      return new APIError(
        "Data Not Found!",
        STATUS_CODES.BAD_REQUEST,
        err.message
      )
    }
  }

  async updateUser(password, email, userId){
    try{
      const hashPassword = await generatePassword(password);
      const updateUser = await UserModel.findByIdAndUpdate({password: hashPassword, email, userId})
      if(updateUser){
        return{
          status: 200,
          success: true,
          message: `Delete account ${userId} success!`,
          updateUser: updateUser
        }
      }
    }
    catch(err){
      return new APIError(
        "Data Not found!",
        STATUS_CODES.UN_AUTHORIZED,
        err.message
      );
    }
  }

  async getDetailUser(userId){
    try{
      // const 
      const getDetail = await UserModel.findById(userId)
      if(getDetail)
        return getDetail;
    }
    catch(err){
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
      const resetLink = `${process.env.URL_FRONT_END }/${user._id}/${token.token}`;
      await sendEmail(user.email, "reset-password", resetLink);

      // **** Send forgot password request  succeed ****
      return {
        status: STATUS_CODES.OK,
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
        status: STATUS_CODES.OK,
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

  
  //=================== POST SERVICE PAYLOAD

  async addPostToUser(userId, post) {
    try {
      console.log(userId, post)
      const postId  = post._id
      
      const user = await UserModel.findById(userId).populate('created_posts');
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }
     
      let createdPosts = user.created_posts    
      await createdPosts.push(postId)
      // await user.created_posts.push(post._id);
      user.created_posts = createdPosts
     
      await user.save();

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Add post to user success!`,
        user: user,

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

  async removePostOfUser(userId, post) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }

      if (user.created_posts.length > 0) {
        user.created_posts.map((item) => {
          if (item._id.toString() === post._id.toString()) {
            const index = user.created_posts.indexOf(item);
            user.created_posts.splice(index, 1);
          } else {
            return new APIError("Post doesn't exist!", STATUS_CODES.NOT_FOUND);
          }
        });
        await user.save();
        return {
          status: STATUS_CODES.OK,
          success: true,
          message: `Remove post ${post} success!`,
          user: user,

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

  async updatePostToUser(userId, post) {
    try {
      const user = await UserModel.findById(userId).populate("created_posts");
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }
      if (user.created_posts.length > 0) {
        user.created_posts.map((item) => {
          if (item._id.toString() === post._id.toString()) {
            return {
              status: STATUS_CODES.OK,
              success: true,
              message: `update post ${post} success!`,
              user: user,

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
        status: STATUS_CODES.OK,
        success: true,
        message: `Get posts success!`,
        user: user,
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

  async getAllUser(){
    try{
      const getAll = await UserModel.find({});
      if(getAll){
        return getAll;
      }  
    }
    catch(err){
      return new APIError(
        "Data Not Found!",
        STATUS_CODES.BAD_REQUEST,
        err.message
      )
    }
  }
  
  //=================== COMMENT SERVICE PAYLOAD
  async getCommentServiceChange(userId, comment, event) {
    try {
      if (userId != comment.userId) {
        return new APIError(
          "Subscribe comment service fail!",
          STATUS_CODES.NOT_FOUND
        );
      }
      const user = await UserModel.findById(userId).populate("created_posts");
      if (!user) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }

      if (user.created_posts.length > 0) {
        user.created_posts.map((post) => {
          if (post._id.toString() === comment.postId.toString()) {
            switch (event) {
              // Subscribe comment-service
              case "REMOVE_COMMENT":
                return {
                  status: STATUS_CODES.OK,
                  success: true,
                  message: `${event}: ${comment._id} by  user: ${user.email} success!`,
                  comment: comment,
                };

              case "ADD_COMMENT":
                return {
                  status: STATUS_CODES.OK,
                  success: true,
                  message: `${event}: ${comment._id} by  user: ${user.email} success!`,
                  comment: comment,
                };

              case "UPDATE_COMMENT":
                return {
                  status: STATUS_CODES.OK,
                  success: true,
                  message: `${event}: ${comment._id} by  user: ${user.email} success!`,
                  comment: comment,
                };
              default:
                break;
            }
          } else {
            return new APIError("Post doesn't exist!", STATUS_CODES.NOT_FOUND);
          }
        });
      } else {
        return new APIError("No Post available!!", STATUS_CODES.NOT_FOUND);
      }
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async getUserPayload(userId, event) {
    const user = await UserModel.findById(userId);

    if (user) {
      const payload = {
        event: event,
        data: { user },
      };
      return payload;
    } else {
      return new APIError(
        "No user available!",
        STATUS_CODES.INTERNAL_ERROR,
        
      );
    }
  }
  
  async SubscribeEvents(payload) {
    try {
      payload = JSON.parse(payload)

      const { event, data } = payload;
      const comment = "";
      const {userId, post} = data
      
      switch (event) {
        // Subscribe post-service
        case "REMOVE_POST":
          this.removePostOfUser(userId, post);
          break;
        case "ADD_POST":
          this.addPostToUser(userId, post);
          break;
        case "UPDATE_POST":
          this.updatePostToUser(userId, post);
          break;
        case "GET_POSTS":
          this.getUserCreatedPosts(userId);
          break;
  
        // Subscribe comment-service
        case "REMOVE_COMMENT":
          this.getCommentServiceChange(userId, comment, event);
          break;
          
        case "ADD_COMMENT":
          this.getCommentServiceChange(userId, comment, event);
          break;
        case "UPDATE_COMMENT":
          this.getCommentServiceChange(userId, comment, event);
          break;
  
        default:
          break;
      }
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }
}



module.exports = UserService;
