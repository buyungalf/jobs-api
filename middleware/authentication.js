const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //ATTACH THE USER TO THE JOB ROUTES
    req.user = { userId: payload.userId, name: payload.name };

    // const user = User.findById(payload.id).select("-password");
    // req.user = user;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid!!");
  }
};

module.exports = auth;
