const jwt = require("jsonwebtoken");
const User = require("../models/User");

// authMiddleware now async because it queries the DB
module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // lookup user in db to get role and existence
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; // full document
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};