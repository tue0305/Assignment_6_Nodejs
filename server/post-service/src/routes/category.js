const express = require('express');
const router = express.Router();
const { verifyToken, CategoryController} = require('../api')

// @route GET api/Category
<<<<<<< HEAD
// @des get Categories
// @access Public
router.get('/', CategoryController.getCategories);

=======
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
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453


// @route Category api/Category/user/create
// @desc create Category
// @access Public
<<<<<<< HEAD
router.post('/create', verifyToken,  CategoryController.createCategory );
=======
router.Category('user/create', verifyToken,  CategoryController.createCategory );
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

// @route PUT api/Category/edit
// @desc edit Category
// @access Public
<<<<<<< HEAD
router.put('/edit/:categoryId', verifyToken, CategoryController.editCategory);


// @route DELETE api/Category/user/delete/categoryId
// @des send reset password's to Category's email
// @access Public
router.delete('user/delete/:categoryId', verifyToken, CategoryController.deleteCategory);
=======
router.put('user/edit/:CategoryId', verifyToken, CategoryController.editCategory);


// @route DELETE api/Category/user/delete/CategoryId
// @des send reset password's to Category's email
// @access Public
router.delete('user/delete/:CategoryId', verifyToken, CategoryController.deleteCategory);
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453





module.exports = router;



