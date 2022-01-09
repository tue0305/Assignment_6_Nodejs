const UserService = require("../../services/user_service");
const { publishMessage, subscribeMessage } = require("../../utils");
const {
    POST_BINDING_KEY,
    COMMENT_BINDING_KEY,
} = require("../../config/config");
const { verifyToken, uploadAvatar, authorize } = require("../middlewares");

module.exports = async (app, channel) => {
    const service = new UserService();
    subscribeMessage(channel, service);

    // @route GET api/user
    // @des Check if user is logged in
    // @access Public
    app.get("/profile", verifyToken, async (req, res, next) => {
        try {
            const userId = req.userId;

            const user = await service.getProfile(userId);

            return res.json(user);
        } catch (error) {
            next(error);
        }
    });

    // @route POST api/user/signup
    // @desc signup user
    // @access Public
    app.post("/signup", uploadAvatar("avatarUser"), async (req, res, next) => {
        try {
            const { email, password, role } = req.body;
            const { file } = req;

            const data = await service.createUser({
                email,
                password,
                role,
                file,
            });
            const payload = await service.getUserPayload(
                data.userId,
                "ADD_USER"
            );

            publishMessage(channel, POST_BINDING_KEY, JSON.stringify(payload));
            publishMessage(
                channel,
                COMMENT_BINDING_KEY,
                JSON.stringify(payload)
            );
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    // @route DELETE /delete-user/:userId
    // @desc delete user
    // @access Public
    app.delete("/delete-user/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params;
            const deleteUser = await service.deleteUser(userId);
            return res.json({ success: true, deleteUser });
        } catch (err) {
            next(err);
        }
    });

    // @route UPDATE /update-user/:userId
    // @desc update user
    // @access Public
    app.put("/update-user/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { password, email } = req.body;
            const updateUser = await service.updateUser(
                password,
                email,
                userId
            );
            return res.json(updateUser);
        } catch (err) {
            next(error);
        }
    });

    // @route GET /logout
    // @desc Logout user
    // @access Public
    app.get("/logout", async (req, res, next) => {
        try {
            req.clearCookie("jwt");
            return res.status(200).json({ success: true, message: "Logout" });
        } catch (err) {
            console.log(err, "err");
            res.status(500).json({ success: false, message: "Logout Fail" });
        }
    });

    // @route GET /get-all-users
    // @desc Get all users
    // @access Public
    app.get("/get-all-users", async (req, res, next) => {
        try {
            const getAll = await service.getAllUser();
            res.json(getAll);
        } catch (err) {
            next(err);
        }
    });

    // @route GET /detail-user/:userId
    // @desc Get detail user
    // @access Public
    app.get("/detail-user/:userId", async (req, res, next) => {
        try {
            const { userId } = req.params;
            const getDetail = await service.getDetailUser(userId);
            res.json(getDetail);
        } catch (err) {
            next(err);
        }
    });

    // @route POST api/user/login
    // @desc Login user
    // @access Public
    app.post(`/signin`, async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const data = await service.checkSignIn({ email, password });

            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    // @route POST api/user/forgot-password
    // @des send reset password's to user's email
    // @access Public
    app.post("/forgot-password", async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await service.forgotPasswordRequest(email);

            return res.json(result);
        } catch (error) {
            next(error);
        }
    });

    // @route POST api/user/reset-password
    // @des Reset password with userId and forgot password's token generate in user's email
    // @access Public
    app.post("/reset-password/:userId/:token", async (req, res, next) => {
        try {
            const { userId, token } = req.params;
            const { password, confirmPassword } = req.body;

            const result = await service.resetPassword(
                password,
                confirmPassword,
                userId,
                token
            );

            return res.json(result);
        } catch (error) {
            next(error);
        }
    });
};
