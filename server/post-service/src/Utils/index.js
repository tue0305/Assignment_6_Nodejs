const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { ACCESS_SECRET_TOKEN } = require("../config/config");

// ================================== UTILITY FUNCTIONS =================================

// ***** Password utilities *****

async function generatePassword(enteredPassword) {
    return await argon2.hash(enteredPassword);
}

const validatePassword = async (savedPassword, enteredPassword) => {
    return await argon2.verify(savedPassword, enteredPassword);
};

// ***** Access token utilities  *****
const verifySignature = async (req) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

        req.userId = decoded._id;
        return true;
    }

    return false;
};

const generateSignature = async (userId) => {
    return await jwt.sign(userId, ACCESS_SECRET_TOKEN, { expiresIn: "1d" });
};

const PublishUserEvent = async (payload) => {
    await axios.post("http://localhost:8000/api/user/app-events", {
        payload,
    });
};

const PublishCommentEvent = async (payload) => {
    await axios.post("http://localhost:8000/api/comment/app-events", {
        payload,
    });
};

// **************************************
module.exports = {
    generatePassword,
    validatePassword,

    generateSignature,
    verifySignature,

    PublishUserEvent,
    PublishCommentEvent,
};
0