const { PostModel, CategoryModel } = require("../database/models");
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

class PostService {
  async getPosts() {
    try {
      // ***** GET ALL POSTS *****
      const posts = await PostModel.find();

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async getPost(postId) {
    try {
      // ***** GET ALL POSTS *****
      const post = await PostModel.findById(postId);

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get post ${post._id} successfully!`,
        posts: post,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async getPostsByCategory(categoryTitle) {
    try {
      console.log(categoryId)
      // ***** GET CATEGORY_ID BY NAME*****
      const category = await CategoryModel.findOne({ _id: categoryId });

      // ***** GET ALL POSTS BY CATEGORY*****
      const posts = await PostModel.find({ category: category });
      if (!posts) {
        return {
          status: 400,
          success: false,
          message: `This category don't have any post!`,
        };
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get ${category.title}'s posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async getUserPosts(userId) {
    try {
      // ***** GET ALL USER's POSTS *****
      const posts = await PostModel.find({ userId: userId }).populate(`user`, [
        `email`,
      ]);
      if (!posts) {
        return {
          status: STATUS_CODES.NOT_FOUND,
          success: false,
          message: `No post available!`,
        };
      }
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Get posts successfully!`,
        data:  posts ,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async createPost(title, image, content, gradients, categoryTitle, userId) {
    var category = await CategoryModel.findOne({ title: categoryTitle });
    // **** Simple validation ****
    if (!title || !content || !gradients || !category || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    try {
      // ***** CREATE NEW POST *****

      const newPost = new PostModel({
        title,
        content,
        category,
        gradients,
        image,
        userId,
      });
      console.log(category);
      await newPost.save();

      var post = { 
        _id: newPost._id,
        title: newPost.title,
        image: newPost.image
      }
      await category.posts.push(post);
      await category.save()
      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create  posts successfully!`,
        data: newPost,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async editPost(postId, title, image, content, gradients, categoryTitle, userId) {
   

    // **** Simple validation ****
    if (!postId || !title || !content || !gradients || !categoryTitle || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    const category = await CategoryModel.findOne({ title: categoryTitle });

    try {
      // ***** UPDATE NEW POST *****
      var updatePost = {
        title,
        content,
        gradients,
        category,
        image,
      };

      const postUpdateConditions = { _id: postId, userId: userId };

      updatePost = await PostModel.findOneAndUpdate(
        postUpdateConditions,
        updatePost,
        { new: true }
      );

      if (!updatePost) {
        return new APIError(
          "User not authorized to update or post not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update post ${updatePost._id} successfully!`,
        data:  updatePost ,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  //### NOT DONE
  async deletePost(userId, postId) {
    // **** Simple validation ****
    if (!postId || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    try {
      const postDeleteConditions = { _id: postId, userId: userId };

      deletedPost = await PostModel.findOneAndDelete(postDeleteConditions);

      if (!deletedPost) {
        return new APIError(
          "User not authorized to update or post not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete post ${postId} successfully!`,
        data: { userId, postId },
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
    try {
      const { event, data } = payload;

    // const { /*userId*/, postId, commentId } = data;

    switch (event) {
      // Subscribe user-service
      case "REMOVE_POST":
        this.removePostOfUser(userId, postId);
        break;
      case "ADD_POST":
        this.addPostToUser(userId, postId);
        break;
      case "UPDATE_POST":
        this.updatePostToUser(userId, postId);
        break;
      case "GET_POSTS":
        this.getUserCreatedPosts(userId);
        break;

      default:
        break;
    }
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,~
        error.message
      );
    }
  }

  async getPostPayloadUser(userId, post, event) {
    try {
      if (post) {
        const payload = {
          event: event,
          data: { userId, post } ,
        };
        return payload;
      } else {
        return new APIError("No post available!", STATUS_CODES.INTERNAL_ERROR);
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

module.exports = PostService;
