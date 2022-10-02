const crypto = require("crypto");

module.exports = {
  success: (res, data) => {
    res.status(200).json({
      status: 200,
      data: data,
    });
  },
  error: (res, data) => {
    res.status(400).json({
      status: 400,
      data: data,
    });
  },
  notFound: (res, data) => {
    res.status(404).json({
      status: 404,
      data: data,
    });
  },
  serverError: (res, data) => {
    res.status(500).json({
      status: 500,
      data: data,
    });
  },

  // 生成随机字符串
  randomString: (len) => {
    len = len || 32;
    const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    const maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  // 生成随机数字
  randomNumber: (len) => {
    len = len || 32;
    const $chars = "0123456789";
    const maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  // 密码加密,salt
  encrypt: (password, salt) => {
    if (!salt) salt = GB.randomString(6);
    const hash = crypto.createHash("sha256");
    hash.update(password + salt);
    return {
      salt: salt,
      password: hash.digest("hex"),
    };
  },
  // 密码验证
  verify: (password, salt, hash) => {
    const _hash = crypto.createHash("sha256");
    _hash.update(password + salt);
    return _hash.digest("hex") === hash;
  },

  // 生成 token
};
