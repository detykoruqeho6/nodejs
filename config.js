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
};
