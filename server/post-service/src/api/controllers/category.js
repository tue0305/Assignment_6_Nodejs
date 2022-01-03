const CategoryService = require("../../services/category_service");

const service = new CategoryService();
const  verifyToken  = require("../middlewares/auth");


module.exports = async (app, channel) => {
  // @route GET api/Category
  // @des get Categories
  // @access Public
  app.get("/category", async (req, res, next) => {
    try {
      const data = await service.getCategories();

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // @route Category api/Category/user/create
  // @desc create Category
  // @access Public
  app.post("/category/create", verifyToken, async (req, res, next) => {
    try {
      const { title } = req.body;

      const data = await service.createCategory(title);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // @route PUT api/Category/edit
  // @desc edit Category
  // @access Public
  app.put("category/edit/:categoryId", verifyToken, async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const { title } = req.body;

      const data = await service.updateCategory(categoryId, title);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // @route DELETE api/Category/user/delete/categoryId
  // @des send reset password's to Category's email
  // @access Public
  app.delete("category/delete/:categoryId", verifyToken, async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const data = await service.deleteCategory(categoryId);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // @route GET /get-detail-category/:categoryId
  // @des Get detail Category
  // @access Public
  app.get('/get-detail-category/:categoryId', async (req, res, next) =>{
    try{
      const { categoryId } = req.params;
      const data = await service.getDetailCategory(categoryId)
      return res.json(data);
    }
    catch(err) {
      next(err)
    }
  });
};


