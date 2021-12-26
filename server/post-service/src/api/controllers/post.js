const PostService = require("../../services/post_service");

const service = new PostService();

module.exports.getPosts = async (req, res, next) => {
  try {
    const data = await service.getPosts();

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.getPostsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const data = await service.getPostsByCategory(category);

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const data = await service.getUserPosts(userId);

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.getPostsByCategory = async (req, res, next) => {
  try {
    const { categoryTitle } = req.params.category;

    const data = await service.getPostsByCategory(categoryTitle);

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const userId = req.userId
    const { title, image, content, gradients, category } = req.body;

    const data = await service.createPost(title, image, content, gradients, category, userId );

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editPost = async (req, res, next) => {
  try {
    const {postId} = req.params
    const userId = req.userId
    const { title, image, content, gradients, category } = req.body;

    const data = await service.editPost(postId, title, image, content, gradients, category, userId );

    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const {postId} = req.params
    const userId = req.userId
    

    const data = await service.editPost(postId, userId );

    return res.json(data);
  } catch (err) {
    next(err);
  }
};


