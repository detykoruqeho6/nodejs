module.exports = {
  mysql: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "express-database",
    port: 3306,
  },
  public: "public",
  prefix: process.env.TABLE_PREFIX,
  token_secret: "express-!@#$%^&*()!@$#$^%^*&*",
  email: {
    host: "smtp.163.com",
    port: 465,
    auth: {
      user: "kucaisr@163.com",
      pass: "CSUNQWPLJVHJUCPK",
    },
  },
  appId: "wx59c2dc3830f35b4e",
  appSecret: "79406e4ccd8eb13ff83ee0a21be86041",
  // token过期时间
  tokenExpiresIn: "1d",
  // 是否启用模拟 微信登录 环境,
  isMockWlogin: true,
};
