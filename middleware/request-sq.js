// 请求节流中间件,当请求频率过高时,会自动返回429状态码
// 用于防止恶意请求
// 用法: app.use(require('./middleware/request-sq.js')(1000, 10));
// 参数1: 限制时间,单位毫秒,默认1000毫秒
// 参数2: 限制次数,默认10次

const CacheModule = require("../package/cache");

// 返回值: 中间件函数

exports.RequestThrottling = (time = 1000, count = 10) => {
  const map = new Map();
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    if (map.has(ip)) {
      const arr = map.get(ip);
      while (arr.length && now - arr[0] >= time) {
        arr.shift();
      }
      if (arr.length >= count) {
        return res.status(429).end();
      }
      arr.push(now);
    } else {
      map.set(ip, [now]);
    }
    next();
  };
};
