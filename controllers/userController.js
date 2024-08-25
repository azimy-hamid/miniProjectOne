const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const express = require("express");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json("Email not valid");
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json("Password not strong enough!");
    }

    if (
      name &&
      email &&
      password &&
      validator.isEmail(email) &&
      validator.isStrongPassword(password)
    ) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = new User({ name, email, passwordHash });
      await user.save();

      const newUser = await User.findOne({ email });
      req.session.user = { userId: user._id };
      req.session.authorized = true;
      res.cookie("userId", user._id.toString(), { httpOnly: false });

      return res.status(200).json({ message: "Success - User Created" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Authenticate a user (login)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    if (validator.isEmail(email)) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (isMatch) {
        req.session.user = { userId: user._id };
        req.session.authorized = true;
        res.cookie("userId", user._id.toString(), { httpOnly: false });

        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      return res.status(400).json({ error: "Invalid email format" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
