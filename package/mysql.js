const { Sequelize } = require("sequelize");
const { mysql } = require("../config");

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  dialect: "mysql",
  logging: (msg) => {
    // console.log(msg);
  },
  define: {
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
  },
  // 不清除数据库中的数据
  dropSchema: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+08:00",
  dialectOptions: {
    dateStrings: true,
  },
});
// 监听数据库创建
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Mysql database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


sequelize.sync({ force: false });

module.exports = sequelize;
