const express = require('express');
const router = express.Router();
const { verifyToken, CategoryController} = require('../api')

// @route GET api/Category
// @des get Categorys
// @access Public
router.get('/', CategoryController.getCategories);

// @route GET api/Category
// @des get Categorys by category
// @access Public
router.get('/:category', CategoryController.getCategoriesByCategory);

// @route GET api/Category/user
// @desc get user's Category
// @access Public
router.get('/user', verifyToken,  CategoryController.getUserCategorys );


// @route Category api/Category/user/create
// @desc create Category
// @access Public
router.Category('user/create', verifyToken,  CategoryController.createCategory );

// @route PUT api/Category/edit
// @desc edit Category
// @access Public
router.put('user/edit/:CategoryId', verifyToken, CategoryController.editCategory);


// @route DELETE api/Category/user/delete/CategoryId
// @des send reset password's to Category's email
// @access Public
router.delete('user/delete/:CategoryId', verifyToken, CategoryController.deleteCategory);





module.exports = router;



