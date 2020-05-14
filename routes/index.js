const express = require("express");
const router = express.Router();
const {
  landingPage,
  getRegister,
  register,
  getLogin,
  login,
  logout,
} = require("../controllers/index");
const { asyncErrorHandler, checkIfUserExists } = require("../middleware/index");

/* GET home/landing page. */
router.get("/", asyncErrorHandler(landingPage));

/* GET /register. */
router.get("/register", getRegister);

/* POST /register. */
router.post(
  "/register",
  asyncErrorHandler(checkIfUserExists),
  asyncErrorHandler(register)
);

/* GET /login. */
router.get("/login", getLogin);

/* POST /login. */
router.post("/login", asyncErrorHandler(login));

/* Get /Logout. */
router.get("/logout", logout);

module.exports = router;
