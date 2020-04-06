const User = require("../models/user");

module.exports = {
  asyncErrorHandler: (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },
  checkIfUserExists: async (req, res, next) => {
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      req.session.error = "A user with the given email is already registered";
      return res.redirect("back");
    }
    next();
  },
};
