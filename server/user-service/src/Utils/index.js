const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { ACCESS_SECRET_TOKEN } = require("../config/config");

// ================================== UTILITY FUNCTIONS =================================

// ***** Password utilities *****
const sendEmail = require("./sendEmail");

const generatePassword = async (enteredPassword) => {
  return await argon2.hash(enteredPassword);
};

const validatePassword = async (savedPassword, enteredPassword ) => {
  return await argon2.verify(savedPassword, enteredPassword);
};

// ***** Access token utilities  *****
const verifySignature = async (req, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  

  if (token) {
    const decoded = await jwt.verify(token, ACCESS_SECRET_TOKEN)
    
    req.userId = decoded._id
    return true
  }

  return false;
};

const generateSignature = async (userId) => {
  return await jwt.sign(userId, ACCESS_SECRET_TOKEN, { expiresIn: "1d" });
};



const PublishCommentEvent = async (payload) => {
  await axios.post("http://localhost:8000/comment/app-events", {
    payload,
  });
};

const PublishPostEvent = async (payload) => {
  try {
    await axios.post("http://localhost:8000/post/app-events", {
    payload,
  });
  } catch (error) {
    console.log(error.message)
  }
};

// **************************************
module.exports = {
  generatePassword,
  validatePassword,

  generateSignature,
  verifySignature,
  sendEmail,

  PublishCommentEvent,
  PublishPostEvent
};
