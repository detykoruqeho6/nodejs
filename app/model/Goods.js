const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");
const { DataTypes } = require("sequelize");

const Goods = sequelize.define(
  "Goods",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: "商品id",
    },
    // 商品名称,非空,长度50
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "商品名称",
    },
    // 商品描述,非空,长度50
    desc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "商品描述",
    },
    // 商品内容,富文本,非空
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "商品内容",
    },
    // 商品图片,JSON格式,长度500
    img: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "商品图片",
    },
    // 商品价格,单价,非空,长度10
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "商品价格",
    },
    // 商品状态,非空,长度10
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    // 商品分类id,非空,长度10
    cate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品分类id",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "Goods",
  }
);

module.exports = Goods;
