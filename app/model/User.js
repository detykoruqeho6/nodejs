const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { randomString } = require("../../common");
const { prefix } = require("../../config");
const UserAccount = require("./UserAccount");

const User = sequelize.define(
  "User",
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
    // password密码,非空,长度100
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "密码",
    },
    // salt盐,非空,默认值0,长度10
    salt: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "",
      comment: "密码加密盐",
    },
    // 邮箱,非空,长度50,唯一
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
      comment: "邮箱",
    },
    // 手机号,非空,长度11,唯一
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
      unique: true,
      comment: "手机号",
    },
    // nickname昵称,非空,长度20,可包含 emoji 表情,utf8mb4
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "昵称",
      defaultValue: "🙂?  ",
    },
    // 账号介绍,长度100
    introduction: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "账号介绍",
      defaultValue: "这个人很懒,什么都没有留下~",
    },
    // 头像,可空,长度100
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "头像",
      defaultValue: process.env.DEFAULT_AVATAR,
    },
    // 性别,可空,长度10,tinyint
    gender: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "性别 1:男 2:女 3:保密",
      defaultValue: 3,
    },
  },
  {
    // 这是其他模型参数
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "User",
  }
);

User.hasOne(UserAccount, {
  foreignKey: {
    name: "id",
    allowNull: false,
  },
  targetKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "hasAccount",
});

UserAccount.belongsTo(User, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "hasUser",
});

module.exports = User;
