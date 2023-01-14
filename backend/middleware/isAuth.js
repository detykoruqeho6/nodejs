const { verifyToken, verifyTokenExp } = require("../../common");

const isAuth = (req, res, next) => {
  const token =
    req.headers.authorization || req.headers.Authorization || req.headers.token;
  if (!token) {
    return COMMON.error(res, null, "请登录后操作");
  }
  const decoded = verifyToken(token);
  req.userId = decoded.id;
  next();
};

module.exports = isAuth;
