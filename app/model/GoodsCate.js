const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");
const { DataTypes } = require("sequelize");
const GoodsModel = require("./Goods");

const GoodsCate = sequelize.define(
  "GoodsCate",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // 商品分类名称,非空,长度20
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "商品分类名称",
    },
    // 商品分类描述,非空,长度50
    desc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "商品分类描述",
    },
    // 商品分类状态,非空,长度10
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "GoodsCate",
  }
);

module.exports = GoodsCate;
