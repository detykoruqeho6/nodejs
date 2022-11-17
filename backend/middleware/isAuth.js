const { verifyToken, verifyTokenExp } = require("../../common");

const isAuth = (req, res, next) => {
  const token =
    req.headers.authorization || req.headers.Authorization || req.headers.token;
  if (!token) {
    return COMMON.error(res, null, "请登录");
  }
  const decoded = jwt.verify(token, "secret");
  if (!decoded) {
    return COMMON.error(res, null, "登录过期，请重新登录");
  }
  req.userId = decoded.userId;
  next();
};

module.exports = isAuth;
