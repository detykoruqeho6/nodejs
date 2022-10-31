const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");
const { DataTypes } = require("sequelize");
const GoodsCategoryModel = require("./GoodsCate");

// 商品与商品分类关联中间表
const GoodsAndGoodsCate = sequelize.define(
  "GoodsMainInfo",
  {
    // shop_id,商家id,非空,长度10
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商家id",
    },
    // goods_id,商品id,非空,长度10
    goods_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品id",
    },
    // goods_cate_id,商品分类id,非空,长度10,JSON
    goods_cate_id: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "商品分类id",
    },
  },
  {
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "GoodsMainInfo",
  }
);

module.exports = GoodsAndGoodsCate;
