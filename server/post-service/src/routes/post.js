const express = require('express');
const router = express.Router();
const { verifyToken, PostController} = require('../api')

// @route GET api/post
// @des get posts
// @access Public
router.get('/', PostController.getPosts);

// @route GET api/post/categoryId
// @des get posts by category
// @access Public
router.get('/:categoryId', PostController.getPostsByCategory);

// @route GET api/post/user
// @desc get user's post
// @access Public
router.get('/user', verifyToken,  PostController.getUserPosts );

// @route GET api/post/postId
// @desc get post detail
// @access Public
router.get('/:postId', PostController.getPost );


// @route POST api/post/user/create
// @desc create post
// @access Public
router.post('/user/create', verifyToken,  PostController.createPost );

// @route PUT api/post/edit
// @desc edit post
// @access Public
router.put('/user/edit/:postId', verifyToken, PostController.editPost);


// @route DELETE api/post/user/delete/postId
// @des send reset password's to post's email
// @access Public
router.delete('/user/delete/:postId', verifyToken, PostController.deletePost);





module.exports = router;



