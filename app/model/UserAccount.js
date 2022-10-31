const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");

const UserAccount = sequelize.define(
  "UserAccount",
  {
    // id主键,自增,非空,无符号,整型,长度10,关联User表
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id",
    },
    // 账号余额,非空,默认值0,长度10
    balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "账号余额",
    },
    // 是否冻结,非空,默认值0,长度1
    is_freeze: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "是否冻结 1:冻结 0:未冻结",
    },
    // VIP等级,非空,默认值0,长度1
    vip_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "VIP等级 1:普通用户 2:VIP用户",
    },
    // wechat openid
    openid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "微信openid",
    },
    // session_key
    session_key: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "微信session_key",
    },
    // vip 开启时间
    vip_start_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "vip 开启时间",
    },
    // vip 结束时间
    vip_end_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "vip 结束时间",
    },
    // 个人空间是否开放
    is_open: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "个人空间是否开放 1:开放 0:未开放",
    },
    // last ip
    last_ip: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "最后登录ip",
      validate: {
        isIP: true,
      },
    },
    // last login time
    last_login_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
      comment: "最后登录时间",
    },
    // last system
    last_system: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "",
      comment: "最后登录系统",
    },
  },
  {
    sequelize,
    tableName: prefix + "user_account",
    timestamps: true,
  }
);

module.exports = UserAccount;
