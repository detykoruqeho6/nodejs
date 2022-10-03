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
};
