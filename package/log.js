// 写访问日志,根目录下的log文件夹,按天生成日志文件
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const logPath = path.join(__dirname, "../log");
const { checkDirExist } = require("../utils/index");

module.exports = async (req, res, next) => {
  try {
    let logFile = moment().format("YYYY-MM-DD") + ".log";
    checkDirExist(logPath + "/info/");
    let logFilePath = path.join(logPath + "/info/", logFile);
    // 日期 时间 ip 请求方式 请求地址 请求头 请求参数 请求状态
    console.log(req.ipInfo);
    let logData = `
    ${moment().format("YYYY-MM-DD HH:mm:ss")} ${JSON.stringify(req.ipInfo)} ${
      req.method
    } ${req.originalUrl} ${req.headers["user-agent"]} ${JSON.stringify(
      req.body
    )} ${res.statusCode}
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
};
