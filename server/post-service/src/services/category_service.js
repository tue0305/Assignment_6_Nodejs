const { CategoryModel } = require("../database/models");
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

class CategoryService {
    
  async getCategories() {
    try {
      // ***** GET ALL CATEGORY *****
      const categories = await CategoryModel.find();

      return {
        status: 200,
        success: true,
        message: `Get categories successfully!`,
        categories: categories,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async createCategory(newCategory) {
    const  title  = newCategory;

    // **** Simple validation ****
    if (!title) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    try {
      // ***** CREATE NEW CATEGORY *****
      var newCategory = new CategoryModel({
        title,
      });

      await newCategory.save()

      return {
        status: 200,
        success: true,
        message: `Create  category successfully!`,
        Category: newCategory,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  async updateCategory(categoryId,title) {
   
    // **** Simple validation ****
    if (!title || !categoryId) {
      return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
    }

    try {
      // ***** UPDATE  CATEGORY *****

      var updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: categoryId },
        { title: title },
        { new: true }
      );

      if (!updatedCategory) {
        return new APIError("Update category failed!", STATUS_CODES.NOT_FOUND);
      }
      await updatedCategory.save()
      return {
        status: 200,
        success: true,
        message: `Category update successfully!`,
        Category: updatedCategory,
      };
    } catch (error) {
      return new APIError(
        "Data Not found!",
        STATUS_CODES.INTERNAL_ERROR,
        error.message
      );
    }
  }

  //   async deleteCategory(deleteCategory) {
  //     const { categoryTitle } =  newCategory;

  //     // **** Simple validation ****
  //     if (!postId || !title || !content || !gradients || !category || !userId) {
  //       return new APIError("Missing information!!", STATUS_CODES.BAD_REQUEST);
  //     }

  //     const category = await CategoryModel.findOne({ title: categoryTitle });

  //     try {

  //       const postUpdateConditions = { _id: postId, userId: userId };

  //       deletedPost = await CategoryModel.findOneAndDelete(
  //         postUpdateConditions,
  //       )

  //       if (!deletedPost) {
  //         return new APIError("User not authorized to update or Category not found! ", STATUS_CODES.NOT_FOUND)
  //       }

  //       return {
  //         status: 200,
  //         success: true,
  //         message: `Category delete successfully!`,
  //         Category: deletedPost,
  //       };
  //     } catch (error) {
  //       return new APIError(
  //         "Data Not found!",
  //         STATUS_CODES.INTERNAL_ERROR,
  //         error.message
  //       );
  //     }
  //   }
}

module.exports = CategoryService;
