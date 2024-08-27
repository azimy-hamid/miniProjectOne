const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authMiddleware = (req, res, next) => {
  if (!req.session.authorized) {
    // If there's no userId in the session, redirect to the login page
    return res.redirect("/login.ejs");
  }
  next(); // If the user is authenticated, proceed to the next middleware/route handler
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
    resave: false, // Don't save the session if it hasn't changed
    saveUninitialized: false, // Don't create a session until something is stored
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24-hour expiration for the cookie
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", async (req, res) => {
  res.render("index.ejs", { title: "Purple Horizon Financial" });
});

app.get("/signup.ejs", async (req, res) => {
  res.render("signup.ejs", { title: "Sign Up - Purple Horizon Financial" });
});

app.get("/login.ejs", async (req, res) => {
  res.render("login.ejs", { title: "Login - Purple Horizon Financial" });
});

app.get("/dashboard", authMiddleware, async (req, res) => {
  res.render("dashboard.ejs", {
    title: "Dashboard - Purple Horizon Financial",
  });
});

app.get("/external", authMiddleware, async (req, res) => {
  res.render("external.ejs", {
    title: "External API Example - Purple Horizon Financial",
  });
});

// app.post("/logout.ejs", async (req, res) => {
//   req.session.destroy();
//   res.clearCookie("userId");
//   res.redirect("/login.ejs");
// });

app.get("/logout.ejs", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      return res.status(500).send("An error occurred while logging out");
    }

    // Optionally clear the cookie
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.clearCookie("userId");

    // Redirect to the login page or homepage
    res.redirect("/login.ejs");
  });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server Running on port number: ${process.env.PORT}`);
    console.log(path.join(__dirname, "public"));
  });
});
