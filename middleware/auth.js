const jwt = require("jsonwebtoken");
const JWT_SECRET = "441b16ade1451213c00e8fe7722d3c5248d03337acedf3bea1e490dbb99e794f"; // Replace with your actual secret key

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Read the token from cookies
  if (!token) {
    return res.redirect("/auth/login"); // Redirect to login if no token is found
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach user info (id and role) to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.clearCookie("token"); // Clear the invalid token
    return res.redirect("/auth/login"); // Redirect to login on token verification failure
  }
};

module.exports = { authenticate };
