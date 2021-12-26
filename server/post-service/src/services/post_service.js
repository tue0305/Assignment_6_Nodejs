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
        status: 200,
        success: true,
        message: `Get posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async getPostsByCategory(categoryTitle) {
    try {
      // ***** GET CATEGORY_ID BY NAME*****
      const category = await CategoryModel.findOne({ title: categoryTitle });

      // ***** GET ALL POSTS BY CATEGORY*****
      const posts = await PostModel.find({ category: category });
      if (!post) {
        return {
          status: 400,
          success: false,
          message: `This category don't have any post!`,
        };
      }

      return {
        status: 200,
        success: true,
        message: `Get ${category.title}'s posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async getUserPosts(userId) {
    try {
      // ***** GET ALL USER's POSTS *****
      const posts = await PostModel.find({ userId: userId }).populate(`user`, [
        `email`,
      ]);

      return {
        status: 200,
        success: true,
        message: `Get user ${userId} posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async createPost(newPostInputs) {
    const { title, image, content, gradients, categoryTitle, userId } =
      newPostInputs;

    // **** Simple validation ****
    if (!title || !content || !gradients || !category || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    const category = await CategoryModel.findOne({ title: categoryTitle });

    try {
      // ***** CREATE NEW POST *****
      var newPost = new Post({
        title,
        content,
        gradients: gradients,
        categoryId: category._id,
        // image: image,
        userId: userId,
      });

      return {
        status: 200,
        success: true,
        message: `Create  posts successfully!`,
        post: newPost,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async editPost(updatePost) {
    const { postId, title, image, content, gradients, categoryTitle, userId } =  updatePost;
    

    // **** Simple validation ****
    if (!postId || !title || !content || !gradients || !category || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    const category = await CategoryModel.findOne({ title: categoryTitle });

    try {
      // ***** CREATE NEW POST *****
      var updatePost = ({
        title,
        content,
        gradients: gradients,
        categoryId: category._id,
        // image: image,
      });

      const postUpdateConditions = { _id: postId, userId: userId };
      
      updatedPost = await PostModel.findOneAndUpdate(
        postUpdateConditions,
        updatedPost,
        { new: true }
      );

      if (!updatedPost) {
        return new APIError("User not authorized to update or post not found! ", STATUS_CODES.NOT_FOUND)
      }

      return {
        status: 200,
        success: true,
        message: `Post update successfully!`,
        post: updatedPost,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }

  async deletePost(deletePost) {
    const { postId, title, image, content, gradients, categoryTitle, userId } =  newPostInputs;
    

    // **** Simple validation ****
    if (!postId || !title || !content || !gradients || !category || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    const category = await CategoryModel.findOne({ title: categoryTitle });

    try {
     

      const postUpdateConditions = { _id: postId, userId: userId };
      
      deletedPost = await PostModel.findOneAndDelete(
        postUpdateConditions,
      )

      if (!deletedPost) {
        return new APIError("User not authorized to update or post not found! ", STATUS_CODES.NOT_FOUND)
      }

      return {
        status: 200,
        success: true,
        message: `Post delete successfully!`,
        post: deletedPost,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        err.message
      );
    }
  }
}

module.exports = PostService;
