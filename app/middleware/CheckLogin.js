const { verifyToken, verifyTokenExp } = require("../../common");

module.exports = (req, res, next) => {
  try {
    const token =
      req.headers.authorization ||
      req.headers["x-access-token"] ||
      req.headers["token"];
    if (!token) {
      return COMMON.error(res, null, "请登录后再操作", 405);
    }
    // 将 token 解密,并验证是否合法
    const decoded = verifyToken(token);
    if (decoded.code) {
      return COMMON.error(
        res,
        null,
        verifyToken(token).message || "Fail Load Token",
        403
      );
    }
    // 验证 Token 是否过期
    if (verifyTokenExp(token)) {
      return COMMON.error(res, null, "登录过期,请重新登录", 403);
    }

    req.user = decoded;
    req.user_id = decoded.id;
    next();
  } catch (err) {
    next(err);
  }
};
