// 中间价,获取 header 中的 Authorization 字段,并验证是否合法
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenExp } = require("../common");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization ||
    req.headers["x-access-token"] ||
    req.headers["token"];
  if (!token) {
    return COMMON.error(res, null, "请登录后再操作", 405);
  }
  // 验证 Token 是否过期
  if (verifyTokenExp(token)) {
    return COMMON.error(res, null, "登录过期,请重新登录", 403);
  }
  // 将 token 解密,并验证是否合法
  const decoded = verifyToken(token);
  if (!decoded) {
    return COMMON.error(res, null, "登录已过期,请重新登录", 403);
  }
  req.user = decoded;
  req.user_id = decoded.id;
  next();
};
