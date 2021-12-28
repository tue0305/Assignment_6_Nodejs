const PostService = require("../../services/post_service");

const service = new PostService();

const { PublishUserEvent, PublishCommentEvent } = require("../../utils");

module.exports.getPosts = async (req, res, next) => {
    try {
        const data = await service.getPosts();

        return res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports.getPostsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;

        const data = await service.getPostsByCategory(category);

        return res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports.getPostsByCategory = async (req, res, next) => {
    try {
        const { categoryTitle } = req.params.category;

        const data = await service.getPostsByCategory(categoryTitle);

        return res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports.getUserPosts = async (req, res, next) => {
    try {
        const userId = req.userId;
        // GET PAYLOAD TO SEND USER_SERVICE

        const result = await service.getUserPosts(userId, "GET_POSTS");

        const payload = await service.getPostPayload(
            userId,
            result.data,
            "GET_POSTS"
        );

        PublishUserEvent(payload);
        return res.json(data);
    } catch (error) {
        next(error);
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
        const userId = req.userId;
        const { title, image, content, gradients, categoryTitle } = req.body;
        const result = await service.createPost(
            title,
            image,
            content,
            gradients,
            categoryTitle,
            userId
        );

        const payload = await service.getPostPayload(
            userId,
            result.data,
            "CREATE_POST"
        );

        PublishUserEvent(payload);
        return res.json(result);
    } catch (error) {
        next(error);
        const userId = req.userId;
        const { title, image, content, gradients, category } = req.body;

        const data = await service.createPost(
            title,
            image,
            content,
            gradients,
            category,
            userId
        );

        return res.json(data);
    }
};

module.exports.editPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;
        const { title, image, content, gradients, category } = req.body;

        const result = await service.editPost(
            postId,
            title,
            image,
            content,
            gradients,
            category,
            userId
        );

        const payload = await service.getPostPayload(
            userId,
            result.data,
            "UPDATE_POST"
        );

        PublishCommentEvent(payload);
        PublishUserEvent(payload);
        return res.json(result);
    } catch (error) {
        next(error);

        const { postId } = req.params;
        const userId = req.userId;
        const { title, image, content, gradients, category } = req.body;

        const data = await service.editPost(
            postId,
            title,
            image,
            content,
            gradients,
            category,
            userId
        );

        return res.json(data);
    }
};

module.exports.deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;

        const result = await service.deletePost(postId, userId);

        const payload = await service.getPostPayload(
            userId,
            result.data,
            "REMOVE_POST"
        );

        PublishCommentEvent(payload);
        PublishUserEvent(payload);
        return res.json(result);
    } catch (error) {
        next(error);
    }
    const { postId } = req.params;
    const userId = req.userId;

    const data = await service.editPost(postId, userId);

    return res.json(data);
};
