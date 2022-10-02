// 获取用户登录ip,登录设备中间件,
module.exports = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const device = req.headers["user-agent"];
  req.device = device;
  req.ip = ip;
  next();
};
