const CategoryService = require("../../services/category_service");

const service = new CategoryService();

module.exports.getCategories = async (req, res, next) => {
  try {
    const data = await service.getCategories();

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const data = await service.createCategory(title);

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { title } = req.body;

    const data = await service.updateCategory(categoryId, title);

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const data = await service.editCategory(categoryId);

    return res.json(data);
  } catch (err) {
    next(err);
  }
};
