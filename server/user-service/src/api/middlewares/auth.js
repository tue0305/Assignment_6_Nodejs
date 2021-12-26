const { verifySignature } = require("../../utils");

const verifyToken = async (req, res, next) => {
  const isAuthorized = await verifySignature(req);
  

  if (isAuthorized) {
    return next()
  }
  return res.status(403).json({ message: "Not Authorized" });
};

module.exports = verifyToken;
