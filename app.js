const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const Log = require("./package/log");
const { checkDirExist } = require("./utils/index");
const expressip = require("express-ip");

const fs = require("fs");
const { RequestThrottling } = require("./middleware/request-sq");

require("dotenv").config();
require("./package/mysql");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressip().getIpInfoMiddleware);
app.use(Log);

// 允许跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,token,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "public")));

// 使用路由
app.use("/", require("./app/index"));
app.use("/api/", require("./app/index"));
app.use("/backend/", require("./backend/index"));

app.use(function (req, res, next) {
  next(createError(404));
});
// app.use(RequestThrottling(1000, 10));
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
  // 如果请求出现错误,则写入日志
  if (err.status == 500 || err.status == 404) {
    try {
      const logPath = path.join(__dirname, "./log");

      let logFile = moment().format("YYYY-MM-DD") + ".log";
      checkDirExist(logPath + "/error/");
      let logFilePath = path.join(logPath + "/error/", logFile);
      // 日期 时间 ip 请求方式 请求地址 请求头 请求参数 请求状态
      let logData = `
      ${moment().format("YYYY-MM-DD HH:mm:ss")} ${req.ip} ${req.method} ${req.originalUrl
        } ${req.headers["user-agent"]} ${JSON.stringify(req.body)} ${res.statusCode
        }
      `;
      // 如果日志文件不存在,则创建
      if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, logData);
      } else {
        fs.appendFileSync(logFilePath, logData);
      }
      next();
    } catch (err) {
      next(err);
    }
  }
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message,
    data: null,
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection:", reason);
  // 在这里处理
});

module.exports = app;
