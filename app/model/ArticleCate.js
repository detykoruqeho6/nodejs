const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");
const { DataTypes } = require("sequelize");

const ArticleCate = sequelize.define(
  "ArticleCate",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: "文章分类id",
    },
    // 文章分类名称,非空,长度20
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "文章分类名称",
    },
    // 文章分类描述,非空,长度50
    desc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "文章分类描述",
    },
    // 文章分类状态,非空,长度10
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "文章分类状态",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "ArticleCate",
  }
);

module.exports = ArticleCate;
