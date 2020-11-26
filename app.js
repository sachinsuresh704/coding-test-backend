var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const formData = require("express-form-data");
var timeout = require("connect-timeout");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(formData.parse());
app.use(timeout("90s"));

//Protected Route
app.all("/users/*", adminRoute);

app.use("/", indexRouter);
require("./routes/users")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

function adminRoute(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader && bearerHeader.startsWith("Bearer")) {
        const token = bearerHeader.slice(7);
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (decoded) {
                req.user = decoded;
                next();
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(403);
    }
}

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
