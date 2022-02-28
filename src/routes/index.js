const express = require("express");
const {
  Signup,
  HomePage,
  LoginPage,
  registerPage,
  Logout,
} = require("../controllers");
const passport = require("passport");

const router = express.Router();

router.route("/").get(LoginPage);
router.route("/register").get(registerPage);
router.route("/home").get(HomePage);
router.route("/api/v1/signin").post(
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/home",
  }),
  function (req, res) {}
);
router.route("/api/v1/signup").post(Signup);
router.route("/logout").get(Logout);

module.exports = router;
