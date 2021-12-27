const { PostModel, CategoryModel } = require("../database/models");
<<<<<<< HEAD
const crypto = require("crypto");
const mongo = require("mongodb")
=======
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
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
<<<<<<< HEAD
        status: STATUS_CODES.OK,
=======
        status: 200,
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
        success: true,
        message: `Get posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
<<<<<<< HEAD
        error.message
=======
        err.message
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      );
    }
  }

  async getPostsByCategory(categoryTitle) {
    try {
      // ***** GET CATEGORY_ID BY NAME*****
      const category = await CategoryModel.findOne({ title: categoryTitle });

      // ***** GET ALL POSTS BY CATEGORY*****
      const posts = await PostModel.find({ category: category });
<<<<<<< HEAD
      if (!posts) {
=======
      if (!post) {
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
        return {
          status: 400,
          success: false,
          message: `This category don't have any post!`,
        };
      }

      return {
<<<<<<< HEAD
        status: STATUS_CODES.OK,
=======
        status: 200,
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
        success: true,
        message: `Get ${category.title}'s posts successfully!`,
        posts: posts,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
<<<<<<< HEAD
        error.message
=======
        err.message
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      );
    }
  }

  async getUserPosts(userId) {
    try {
      // ***** GET ALL USER's POSTS *****
      const posts = await PostModel.find({ userId: userId }).populate(`user`, [
        `email`,
      ]);
<<<<<<< HEAD
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
        data: { userId, posts },
=======

      return {
        status: 200,
        success: true,
        message: `Get user ${userId} posts successfully!`,
        posts: posts,
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
<<<<<<< HEAD
        error.message
=======
        err.message
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      );
    }
  }

<<<<<<< HEAD
  async createPost(title, image, content, gradients, categoryTitle, userId) {
    const category = await CategoryModel.findOne({ title: categoryTitle });
=======
  async createPost(newPostInputs) {
    const { title, image, content, gradients, categoryTitle, userId } =
      newPostInputs;

>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
    // **** Simple validation ****
    if (!title || !content || !gradients || !category || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

<<<<<<< HEAD
    
    
    try {
      // ***** CREATE NEW POST *****
      const _id = new mongo.ObjectID()
      
      const newPost = new PostModel({
        
        title,
        content,
        category,
        gradients,
        image,
        userId
      });
          
     

      await newPost.save()

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Create  posts successfully!`,
        data: { userId, newPost },
=======
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
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
<<<<<<< HEAD
        error.message
=======
        err.message
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      );
    }
  }

  async editPost(updatePost) {
<<<<<<< HEAD
    const { postId, title, image, content, gradients, categoryTitle, userId } =
      updatePost;
=======
    const { postId, title, image, content, gradients, categoryTitle, userId } =  updatePost;
    
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

    // **** Simple validation ****
    if (!postId || !title || !content || !gradients || !category || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    const category = await CategoryModel.findOne({ title: categoryTitle });

    try {
<<<<<<< HEAD
      // ***** UPDATE NEW POST *****
      var updatePost = {
=======
      // ***** CREATE NEW POST *****
      var updatePost = ({
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
        title,
        content,
        gradients: gradients,
        categoryId: category._id,
        // image: image,
<<<<<<< HEAD
      };

      const postUpdateConditions = { _id: postId, userId: userId };

=======
      });

      const postUpdateConditions = { _id: postId, userId: userId };
      
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      updatedPost = await PostModel.findOneAndUpdate(
        postUpdateConditions,
        updatedPost,
        { new: true }
      );

      if (!updatedPost) {
<<<<<<< HEAD
        return new APIError(
          "User not authorized to update or post not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Update post ${updatedPost} successfully!`,
        data: { userId, updatedPost },
=======
        return new APIError("User not authorized to update or post not found! ", STATUS_CODES.NOT_FOUND)
      }

      return {
        status: 200,
        success: true,
        message: `Post update successfully!`,
        post: updatedPost,
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
<<<<<<< HEAD
        error.message
=======
        err.message
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      );
    }
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
<<<<<<< HEAD
        error.message
      );
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    // const { /*userId*/, postId, commentId } = data;

    switch (event) {
      // Subscribe user-service
      case "REMOVE_POST":
        removePostOfUser(userId, postId);
        break;
      case "ADD_POST":
        addPostToUser(userId, postId);
        break;
      case "UPDATE_POST":
        updatePostToUser(userId, postId);
        break;
      case "GET_POSTS":
        getUserCreatedPosts(userId);
        break;

      default:
        break;
    }
  }

  async getPostPayload(userId, postId, event) {
    const post = await PostModel.findById(postId);

    if (post) {
      const payload = {
        event: event,
        data: { userId, post },
      };
      return payload;
    } else {
      return new APIError(
        "No post available!",
        STATUS_CODES.INTERNAL_ERROR
=======
        err.message
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
      );
    }
  }
}

module.exports = PostService;
