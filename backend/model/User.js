const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { randomString } = require("../common");
const { prefix } = require("../../config");

// 后台管理员用户表
const User = sequelize.define(
  "bac_User",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
      comment: "用户id",
    },
    // account账号,非空,唯一,长度20
    account: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
      comment: "账号",
    },
    // password密码,非空,长度32
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "密码",
    },
    // name姓名,非空,长度20
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "姓名",
    },
    // salt 加密盐,非空,长度32
    salt: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "加密盐",
      set(val) {
        console.log(this);
      },
    },
    // 账号介绍,长度100
    introduction: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "账号介绍",
    },

    // email邮箱,非空,长度50
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // 判断是否为邮箱
      validate: {
        isEmail: true,
      },
      comment: "邮箱",
    },
    // 当前管理员账号角色
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "角色",
    },
    // 当前管理员账号状态
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "状态",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "bac_User",
  }
);

module.exports = User;
