const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");

const Role = sequelize.define(
  "bac_Role",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
      comment: "角色id",
    },
    // name角色名,非空,长度20
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "角色名",
    },
    // introduction角色介绍,长度34
    introduction: {
      type: DataTypes.STRING(34),
      comment: "角色介绍",
    },
    // status角色状态,非空,默认1,长度1
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "角色状态",
    },
    // 权限路由 id,json,非空,长度10
    routes: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "权限路由",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "bac_Role",
  }
);

module.exports = Role;
