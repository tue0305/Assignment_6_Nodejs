
const authorize = (arrType) => (req, res, next) => {
    const { user } = req;
    if (arrType.findIndex((element) => element === user.role.ROLE) > -1) {
      next();
    } else {
      res.status(403).send("You not allow!");
    }
};

module.exports = {authorize}