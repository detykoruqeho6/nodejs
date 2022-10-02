const { Sequelize } = require("sequelize");
const { mysql } = require("../config");

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  dialect: "mysql",
  logging: (msg) => {
    console.log(msg);
  },
  define: {
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
  },
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
  // timezone: "+08:00",
  // dialectOptions: {
  //   dateStrings: true,
  // },
});

sequelize.sync({ force: true });

module.exports = sequelize;
