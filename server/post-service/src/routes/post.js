const express = require('express');
const router = express.Router();
const { verifyToken, PostController} = require('../api')

// @route GET api/post
// @des get posts
// @access Public
router.get('/', PostController.getPosts);

// @route GET api/post
// @des get posts by category
// @access Public
router.get('/:category', PostController.getPostsByCategory);

// @route GET api/post/user
// @desc get user's post
// @access Public
router.get('/user', verifyToken,  PostController.getUserPosts );


// @route POST api/post/user/create
// @desc create post
// @access Public
<<<<<<< HEAD
router.post('/user/create', verifyToken,  PostController.createPost );
=======
router.post('user/create', verifyToken,  PostController.createPost );
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

// @route PUT api/post/edit
// @desc edit post
// @access Public
<<<<<<< HEAD
router.put('/user/edit/:postId', verifyToken, PostController.editPost);
=======
router.put('user/edit/:postId', verifyToken, PostController.editPost);
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453


// @route DELETE api/post/user/delete/postId
// @des send reset password's to post's email
// @access Public
<<<<<<< HEAD
router.delete('/user/delete/:postId', verifyToken, PostController.deletePost);
=======
router.delete('user/delete/:postId', verifyToken, PostController.deletePost);
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453





module.exports = router;



