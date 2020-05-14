const createError = require("http-errors");
const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logge = require("./utils/logge");
const methodOverride = require("method-override");

// require routes
const indexRouter = require("./routes/index");
const reservationsRouter = require("./routes/reservations");

const app = express();

// connect to the database
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logge.info("connected to MongoDB");
  })
  .catch((error) => {
    logge.error("error connection to MongoDB:", error.message);
  });

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

//Configure Passport and Sessions
app.use(
  session({
    secret: "hang ten dude!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Set local variables middleware
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  //set success flash message
  res.locals.success = req.session.success || "";
  delete req.session.success;
  //set error flash message
  res.locals.error = req.session.error || "";
  delete req.session.error;
  // continue on to next function in middleware chain
  next();
});

//Mount routes
app.use("/", indexRouter);
app.use("/reservations", reservationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
