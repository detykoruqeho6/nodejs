const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");

// 全局字典
const DictionaryCate = sequelize.define(
  "DictionaryCate",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
      comment: "字典id",
    },
    // name
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "字典名称",
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
    tableName: prefix + "dictionary_cate",
  }
);

//  关联字典分类
DictionaryCate.hasOne(require("./Dictionary"), {
  foreignKey: "id",
  sourceKey: "id",
});

module.exports = DictionaryCate;
