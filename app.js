const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const fileUpload = require("express-fileupload");

require("dotenv").config();
require("./package/mysql");
const app = express();

require("./app/model/Index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);

app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "public")));

// 使用路由
app.use("/", require("./app/index"));
app.use("/api/", require("./app/index"));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  res.json({
    code: err.status || 500,
    message: err.message,
    data: null,
  });
});

app.use(function (req, res, next) {
  // 这里必须是Response响应的定时器【120秒】
  res.setTimeout(120 * 1000, function () {
    console.log("Request has timed out.");
    return res.status(408).send("请求超时");
  });
  next();
});

module.exports = app;
