const User = require("../models/user");
const Reservation = require("../models/Reservation");
const passport = require("passport");
module.exports = {
  //GET
  async landingPage(req, res, next) {
    const reservations = await Reservation.find({});
    res.render("index", { reservations, title: "Climko Clinics" });
  },
  //get register
  getRegister(req, res, next) {
    res.render("register", { title: "Register", username: "", email: "" });
  },
  // user register
  async register(req, res, next) {
    try {
      const user = await User.register(new User(req.body), req.body.password);
      req.login(user, function (err) {
        if (err) return next(err);
        req.session.success = `Welcome to Surf Shop, ${user.username}!`;
        res.redirect("/");
      });
    } catch (err) {
      const { username, email } = req.body;
      let error = err.message;
      if (
        error.includes("duplicate") &&
        error.includes("index: email_1 dup key")
      ) {
        error = "A user with the given email is already registered";
      }
      res.render("register", { title: "Register", username, email, error });
    }
  },
  //get login
  getLogin(req, res, next) {
    res.render("login", { title: "login" });
  },
  // user login
  async login(req, res, next) {
    const { username, password } = req.body;
    const { user, error } = await User.authenticate()(username, password);
    if (!user && error) return next(error);
    req.login(user, function (err) {
      if (err) return next(err);
      req.session.success = `Welcome back, ${username}!`;
      const redirectUrl = req.session.redirectTo || "/";
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
    });
  },

  // user logout
  logout(req, res, next) {
    req.logOut();
    res.redirect("/");
  },
};
