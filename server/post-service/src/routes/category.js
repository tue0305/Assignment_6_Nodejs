const express = require('express');
const router = express.Router();
const { verifyToken, CategoryController} = require('../api')

// @route GET api/Category
// @des get Categories
// @access Public
router.get('/', CategoryController.getCategories);

// @route GET api/get-detail-category/:categoryId
// @des get  Detail Categories
// @access Public
router.get('/get-detail-category/:categoryId', CategoryController.detailCategory);

// @route Category api/Category/user/create
// @desc create Category
// @access Public
router.post('/create', verifyToken,  CategoryController.createCategory );

// @route PUT api/Category/edit
// @desc edit Category
// @access Public
router.put('/edit/:categoryId', verifyToken, CategoryController.editCategory);


// @route DELETE api/Category/user/delete/categoryId
// @des send reset password's to Category's email
// @access Public
router.delete('user/delete/:categoryId', verifyToken, CategoryController.deleteCategory);





module.exports = router;



