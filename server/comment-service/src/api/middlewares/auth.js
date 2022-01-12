const { verifySignature } = require("../../utils");

const verifyToken = async (req, res, next) => {
  try {
    const isAuthorized = await verifySignature(req);
  

  if (isAuthorized) {
    return next()
  }
  return res.status(403).json({ message: "Not Authorized" });
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = verifyToken;
