const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");

// 全局字典
const Dictionary = sequelize.define(
  "Dictionary",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: "字典id",
    },
    // 字典名称,非空,长度20
    cate_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "字典名称",
    },
    // 字典值,非空,长度20
    value: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "字典值",
    },
    // 系统默认值
    sys_default: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "对应字典系统默认值",
    },
    // 字典描述,长度100
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "字段描述",
    },
  },
  {
    sequelize,
    tableName: prefix + "dictionary",
  }
);

module.exports = Dictionary;
