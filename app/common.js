const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { token_secret } = require("../config");

exports.success = (res, data, message) => {
  res.status(200).json({
    status: 200,
    data: data,
    message: message || "success",
  });
};

exports.error = (res, data, message) => {
  res.status(400).json({
    status: 400,
    data: data,
    message: message || "error",
  });
};

exports.notFound = (res, data, message) => {
  res.status(404).json({
    status: 404,
    data: data,
    message: message || "not found",
  });
};

exports.serverError = (res, data, message) => {
  res.status(500).json({
    status: 500,
    data: data,
    message: message || "server error",
  });
};

// 生成随机字符串
exports.randomString = (len) => {
  len = len || 32;
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

// 生成随机数字
exports.randomNumber = (len) => {
  len = len || 32;
  const $chars = "0123456789";
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

// 密码加密,salt
exports.encryptPassword = (password, salt) => {
  if (!salt) salt = "!#@$^%^*";
  const hash = crypto.createHash("sha256");
  hash.update(password + salt);
  return {
    salt: salt,
    password: hash.digest("hex"),
  };
};

// 密码验证
exports.verifyPassword = (password, salt, hash) => {
  const _hash = crypto.createHash("sha256");
  _hash.update(password + salt);
  return _hash.digest("hex") === hash;
};

// 生成token,过期时间1天
exports.generateToken = (data) => {
  return jwt.sign(data, token_secret, {
    expiresIn: "1d",
    // 签发者
    issuer: "",
    // 受众
    audience: "",
    // 主题
    subject: "",
    // 签发时间
    notBefore: new Date().getTime(),
  });
};

// 解析token
exports.verifyToken = (token) => {
  return jwt.verify(token, token_secret);
};
