const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { randomString } = require("../../common");
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
    // password密码,非空,长度64
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "密码",
    },
    // 管理员账号标识,非空,长度20
    markname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: randomString(20),
      comment: "姓名,管理员账号标识",
    },
    // salt 加密盐,非空,长度32
    salt: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "加密盐",
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
      allowNull: true,
      // 判断是否为邮箱
      validate: {
        isEmail: true,
      },
      comment: "邮箱",
    },
    // 当前管理员账号角色,JSON字符串,最多存储10个角色
    role: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "当前管理员账号角色",
    },
    // 账号是否单独路由权限,单独账号权限优先于角色权限
    isRoute: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "账号是否单独路由权限",
    },
    // 当前管理员账号状态,tinyint,长度1,默认值1
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
      comment: "状态",
    },
    // 账号排序
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "账号排序",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    timestamps: true,
    tableName: prefix + "bac_User",
  }
);

module.exports = User;
