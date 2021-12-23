const argon2 = require("argon2");
const jwt = require("jsonwebtoken");


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

const checkEmail = async(email) =>{
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }
  else{
    return false;
  }
};

const checkPassword = async (password) =>{
    if( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)){
      return true;
    }
    else{
      return false;
    }
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

// **************************************
module.exports = {
  generatePassword,
  validatePassword,
  checkPassword,
  generateSignature,
  verifySignature,
  sendEmail,
  checkEmail
};
