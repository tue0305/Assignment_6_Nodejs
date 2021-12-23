const UserService = require("../../services/user_service");

const service = new UserService();

module.exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await service.createUser({ email, password });
    
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
    const { userId } = req.userId;
    const user = await service.getProfile(userId);

    return res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) =>{
  try{
    const { userId } = req.params;
    const deleteUser = await service.deleteUser(userId);
    return res.json({success: true, deleteUser});
  }
  catch(err){
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) =>{
  try{
    const {userId} = req.params;
    const {password, email} = req.body;
    const updaUser = await service.updateUser(password, email, userId);
    return res.json(updaUser);
  }
  catch(err){
    next(error);
  }
};

module.exports.getUser = async (req, res, next) =>{
  try{
    const getAll = await service.getAllUser();
    res.json(getAll);
  }
  catch(err){
    next(err)
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
