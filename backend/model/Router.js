const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");

// 路由表
exports.Router = sequelize.define(
  "bac_Router",
  {},
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "bac_Router",
  }
);
