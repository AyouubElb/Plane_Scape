const jwt = require("jsonwebtoken");

exports.validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // Log token for verification

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err); // Log verification error
        return res.status(401).json({ message: "User not authorized" });
      }

      // Check the structure of the decoded token
      console.log("Decoded Token:", decoded); // Log decoded token

      // Assign the decoded token to req.user if it's correctly structured
      if (decoded && decoded.user) {
        req.user = decoded.user;
        console.log("req.user:", req.user); // Log req.user
      } else {
        console.error("No user information in token"); // Log missing user info
      }

      next();
    });
  } else {
    console.error("Authorization header missing or not valid");
    return res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }
};
