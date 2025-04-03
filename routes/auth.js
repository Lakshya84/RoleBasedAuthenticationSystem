const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user");

const router = express.Router();
const JWT_SECRET =
  "441b16ade1451213c00e8fe7722d3c5248d03337acedf3bea1e490dbb99e794f";

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("image").notEmpty().withMessage("Image URL is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, image } = req.body;

    try {
      const existingAdmin = await userModel.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ error: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userModel.create({
        name,
        email,
        password: hashedPassword,
        image,
      });

      res.redirect("/auth/login");
    } catch (error) {
      res.status(500).send("Error registering admin");
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token with id and role
      const token = jwt.sign(
        { id: user._id, role: user.role }, // Include id and role in the token
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Store the token in an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true, // Prevent JavaScript access to the cookie
        secure: false, // Set to true in production (requires HTTPS)
        maxAge: 3600000, // 1 hour
      });

      res.redirect("/read"); // Redirect to the "All Users" page
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;
