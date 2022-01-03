const { UserModel } = require("../../database/models");

const findUser =  async (userId) =>{
  return await UserModel.findById(userId)
}

const authorize =  (permission) => {
     return async (req, res, next) =>{
      const userId = req.userId;
      const user = await findUser(userId);
      const {role} = user
      if(!permission.includes(role)){
        return res.status(401).json({success: false, message: 'You dont have permission'})
      }
       next();
     }
};

module.exports = authorize