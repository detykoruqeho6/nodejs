const sequelize = require("../../package/mysql");
const { prefix } = require("../../config");
const { DataTypes } = require("sequelize");
const ArticleCateModel = require("./ArticleCate");

const Article = sequelize.define(
  "Article",
  {
    // id主键,自增,非空,无符号,整型,长度10
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: "文章id",
    },
    // 文章标题,非空,长度50
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "文章标题",
    },
    // 文章内容,富文本,非空
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "文章内容",
    },
    // 封面图
    cover: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "封面图",
    },
    // 文章分类,非空,长度20
    cate_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "文章分类",
    },
    // 发布者,非空,长度20
    author: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "发布者",
    },
    // 文章标签,非空,json
    tag: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "文章标签",
    },
    // 文章状态,非空,长度10
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: "文章状态",
    },
  },
  {
    // 这是其他模型参数
    sequelize,
    charset: "utf8mb4",
    tableName: prefix + "Article",
  }
);

Article.hasOne(ArticleCateModel, {
  foreignKey: {
    name: "id",
    allowNull: false,
  },
  sourceKey: "cate_id",
  as: "cate",
});

ArticleCateModel.belongsTo(Article, {
  foreignKey: {
    name: "article_id",
    allowNull: false,
  },
  targetKey: "id",
  as: "article",
});

module.exports = Article;
