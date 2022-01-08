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

  async getPostsByCategory(categoryId) {
    try {
      console.log(categoryId);
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
      const posts = await PostModel.find({ userId: userId });
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
        data: posts,
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
      const categoryPost = {
        _id: category._id,
        title: category.title,
      };

      const newPost = new PostModel({
        title,
        content,
        category: categoryPost,
        gradients,
        image,
        userId,
      });
      await newPost.save();

      var post = {
        _id: newPost._id,
        title: newPost.title,
        image: newPost.image,
      };
      await category.posts.push(post);
      await category.save();
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

  async editPost(
    postId,
    title,
    image,
    content,
    gradients,
    categoryTitle,
    userId
  ) {
    // **** Simple validation ****
    if (
      !postId ||
      !title ||
      !content ||
      !gradients ||
      !categoryTitle ||
      !userId
    ) {
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
        data: updatePost,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  
  async deletePost(userId, postId) {
    // **** Simple validation ****
    if (!postId || !userId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    try {
      const postDeleteConditions = { _id: postId, userId: userId };

      const post = await PostModel.findOne(postDeleteConditions);

      const category = await CategoryModel.findById(post.category._id);

      category.posts.map((item) => {
        if (item._id.toString() === post._id.toString()) {
          const index = category.posts.indexOf(item);
          category.posts.splice(index, 1);
        } else {
          return new APIError("Post doesn't exist!", STATUS_CODES.NOT_FOUND);
        }
      });
      await category.save();
      await PostModel.findOneAndDelete(postDeleteConditions) 
     
      
      
      if (!post) {
        return new APIError(
          "User not authorized to update or post not found! ",
          STATUS_CODES.NOT_FOUND
        );
      }

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Delete post ${post._id} successfully!`,
        category: category,
        data: post,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }


// ========================== SubscribeEvents ====================
async getPostPayload(userId, post, event) {
  try {
    if (post) {
      const payload = {
        event: event,
        data: { userId, post },
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
// ***** Function subscribe *****
  async addCommentToPost(comment) {
    try {
     
      
      
      const post = await PostModel.findById(comment.postId).populate("post_comments");
      if (!post) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }
      let postComments = post.post_comments    
      
      await postComments.push(comment._id)
      post.post_comments = postComments
     
      await post.save();

      return {
        status: STATUS_CODES.OK,
        success: true,
        message: `Add comment ${comment.text} to post ${postId} success!`,
        post: post,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }
  
  async updateCommentToPost(comment) {
    try {
      const post = await PostModel.findById(comment.postId).populate("post_comments");
      if (!post) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }
      if (post.post_comments.length > 0) {
        post.post_comments.map((item) => {
          if (item._id.toString() === comment._id.toString()) {
            return {
              status: STATUS_CODES.OK,
              success: true,
              message: `update post ${post} success!`,
              post: post,
              updated_comment: comment,
            };
          } else {
            return new APIError("Comment doesn't exist!", STATUS_CODES.NOT_FOUND);
          }
        });
      } else {
        return new APIError(
          "Post doesn't have any comments!",
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

  async removeCommentOfPost(comment) {
    try {
      const post = await PostModel.findById(comment.postId).populate("post_comments");
      if (!post) {
        return new APIError("Data Not found!", STATUS_CODES.NOT_FOUND);
      }

      if (post.post_comments.length > 0) {
        post.post_comments.map((item) => {
          if (item._id.toString() === comment._id.toString()) {
            const index = post.post_comments.indexOf(item);
            post.post_comments.splice(index, 1);
          } else {
            return new APIError("Comment doesn't exist!", STATUS_CODES.NOT_FOUND);
          }
        });
        await post.save();
        return {
          status: STATUS_CODES.OK,
          success: true,
          message: `Remove comment ${comment} success!`,
          post: post
        };
      } else {
        return new APIError(
          "Post doesn't have any comment!",
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
// **************
  
  
  async SubscribeEvents(payload) {
    try {
      payload = JSON.parse(payload)

      const { event, data } = payload;
      
      const {comment} = data


      switch (event) {
      // ====== Subscribe comment-service
      // ***** comment post *****
        case "REMOVE_COMMENT":
          this.removeCommentOfPost(comment);
          break;
        case "ADD_COMMENT":
          this.addCommentToPost(comment);
          break;
        case "UPDATE_COMMENT":
          this.updateCommentToPost(comment);
          break;
        // case "GET_COMMENTS":
        //   this.getPostComment(userId);
        //   break;
        
        // ***** comment highlight_text post *****
        // case "REMOVE_COMMENT":
        //   this.removePostOfUser(userId, postId);
        //   break;
        // case "ADD_COMMENT":
        //   this.addPostToUser(userId, postId);
        //   break;
        // case "UPDATE_COMMENT":
        //   this.updatePostToUser(userId, postId);
        //   break;
        // case "GET_COMMENTS":
        //   this.getUserCreatedPosts(userId);
        //   break;

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

module.exports = PostService;
