const UserService = require("../../services/user_service");
const {createChannel, publishMessage } = require("../../utils");
const { POST_BINDING_KEY, COMMENT_BINDING_KEY } = require("../../config/config");



const service = new UserService();

 
  module.exports.signUp = async (req, res, next) => {
    try {
      
      const { email, password } = req.body;
      const data = await service.createUser({ email, password });
      const payload = await service.getUserPayload(data.userId, "ADD_USER")

      
      publishMessage(global.channel, POST_BINDING_KEY, JSON.stringify(payload))
      publishMessage(global.channel, COMMENT_BINDING_KEY, JSON.stringify(payload))
      return res.json(data);
    } catch (err) {
      next(err);
    }
  };
  
  module.exports.signIn = async (req, res, next) => {
    
    try {
      const { email, password } = req.body;
  
      const data = await service.checkSignIn({ email, password });
  
      return res.json(data);
    } catch (err) {
      next(err);
    }
  };
  
  module.exports.getUserInfo = async (req, res, next) => {
    try {
      const userId =req.userId
      
      const user = await service.getProfile(userId);
      
      return res.json(user);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.forgotPasswordRequest = async (req, res, next) => {
    
    try {
      const { email } = req.body;
      const result = await service.forgotPasswordRequest(email);
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports.resetPassword = async (req, res, next) => {
    
    try {
      const { userId, token } = req.params;
      const { password, confirmPassword } = req.body;
  
      const result = await service.resetPassword(password, confirmPassword, userId, token);
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };


 
