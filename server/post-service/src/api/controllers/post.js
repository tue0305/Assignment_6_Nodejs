const PostService = require("../../services/post_service");

const {
    USER_BINDING_KEY,
    COMMENT_BINDING_KEY,
} = require("../../config/config");
const verifyToken = require("../middlewares/auth");
const { publishMessage, subscribeMessage } = require("../../utils");

module.exports = async (app, channel) => {
    const service = new PostService();
    subscribeMessage(channel, service);

    // @route GET api/post
    // @des get posts
    // @access Public
    app.get("/post", async (req, res, next) => {
        try {
            const data = await service.getPosts();

            return res.json(data);
        } catch (error) {
            next(error);
        }
    });

    // @route GET api/post/postId
    // @desc get post detail
    // @access Public
    app.get("/post/:postId", async (req, res, next) => {
        try {
            const { postId } = req.params;
            const data = await service.getPost(postId);

            return res.json(data);
        } catch (error) {
            next(error);
        }
    });

    // @route GET api/post/categoryId
    // @des get posts by category
    // @access Public
    app.get("/post/detail-category/:category", async (req, res, next) => {
        try {
            const { category } = req.params;

            const data = await service.getPostsByCategory(category);

            return res.json(data);
        } catch (error) {
            next(error);
        }
    });

    // @route GET api/post/user
    // @desc get user's post
    // @access Public
    app.get("/post/user/:userID", verifyToken, async (req, res, next) => {
        try {
            const userId = req.userId;
            // GET PAYLOAD TO SEND USER_SERVICE

            const result = await service.getUserPosts(userId, "GET_POSTS");

            const payload = await service.getPostPayload(
                userId,
                result.data,
                "GET_POSTS"
            );
            publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));

            return res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // @route POST api/post/user/create
    // @desc create post
    // @access Public
    app.post("/post/user/create", verifyToken, async (req, res, next) => {
        try {
            const userId = req.userId;
            const { title, image, content, gradients, categoryTitle } =
                req.body;

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
                "ADD_POST"
            );

            publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
            publishMessage(
                channel,
                COMMENT_BINDING_KEY,
                JSON.stringify(payload)
            );

            return res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // @route PUT api/post/edit
    // @desc edit post
    // @access Public
    app.put("/post/user/edit/:postId", verifyToken, async (req, res, next) => {
        try {
            const { postId } = req.params;
            const userId = req.userId;
            const { title, image, content, gradients, categoryTitle } =
                req.body;

            const result = await service.editPost(
                postId,
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
                "UPDATE_POST"
            );

            publishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload));
            publishMessage(
                channel,
                COMMENT_BINDING_KEY,
                JSON.stringify(payload)
            );

            return res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // @route DELETE api/post/user/delete/postId
    // @des send reset password's to post's email
    // @access Public
    app.delete(
        "/post/user/delete/:postId",
        verifyToken,
        async (req, res, next) => {
            try {
                const { postId } = req.params;
                const userId = req.userId;

                const result = await service.deletePost(userId, postId);
                const payload = await service.getPostPayload(
                    userId,
                    result.data,
                    "REMOVE_POST"
                );

                publishMessage(
                    channel,
                    USER_BINDING_KEY,
                    JSON.stringify(payload)
                );
                publishMessage(
                    channel,
                    COMMENT_BINDING_KEY,
                    JSON.stringify(payload)
                );
                return res.json(result);
            } catch (error) {
                next(error);
            }
        }
    );
};
