const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const axios = require("axios");
=======
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

const { ACCESS_SECRET_TOKEN } = require("../config/config");

// ================================== UTILITY FUNCTIONS =================================
<<<<<<< HEAD

// ***** Password utilities *****


const generatePassword = async (enteredPassword) => {
  return await argon2.hash(enteredPassword);
};

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
=======

// ***** Password utilities *****
const sendEmail = require("./sendEmail");

const generatePassword = async (enteredPassword) => {
  return await argon2.hash(enteredPassword);
};

const validatePassword = async (savedPassword, enteredPassword ) => {
  return await argon2.verify(savedPassword, enteredPassword);
};

// ***** Access token utilities  *****
const verifySignature = async (req) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  

  if (token) {
    const decoded = jwt.verify(token,process.env.ACCESS_SECRET_TOKEN)
    
    req.userId = decoded._id
    return true;
  }

  return false;
};

const generateSignature = async (userId) => {
  return await jwt.sign(userId, ACCESS_SECRET_TOKEN, { expiresIn: "1d" });
};



// module.exports.PublishCustomerEvent = async (payload) => {
//   axios.post("http://localhost:8000/customer/app-events", {
//     payload,
//   });
// };

// module.exports.PublishShoppingEvent = async (payload) => {
//   axios.post("http://localhost:8000/shopping/app-events", {
//     payload,
//   });
// };
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453

// **************************************
module.exports = {
  generatePassword,
  validatePassword,

  generateSignature,
  verifySignature,
<<<<<<< HEAD
  
  PublishUserEvent,
  PublishCommentEvent
=======
  sendEmail
>>>>>>> 18caae81e3755bfe1a783bf9a614a48c80e69453
};
