const ArticleModel = require("../model/Article"),
  ArticleCateModel = require("../model/ArticleCate");
const sequelize = require("sequelize");

exports.getArticleList = async (req, res, next) => {
  try {
    // 默认值,page
    let { page = 1, pageSize = 10, cate_id = 0 } = req.query;
    const offset = (page - 1) * pageSize;
    const where = {};
    if (cate_id) {
      where.cate_id = cate_id;
    }
    const articleList = await ArticleModel.findAll({
      where,
      offset,
      limit: +pageSize,
      // content 只取前100个字符
      attributes: [
        "id",
        "title",
        "cover",
        "tag",
        "updatedAt",
        "author",
        [
          sequelize.fn("substring", sequelize.col("content"), 1, 100),
          "content",
        ],
      ],

      include: [
        {
          model: ArticleCateModel,
          as: "cate",
          attributes: ["id", "name"],
        },
      ],
    });
    // 查询全部总条数
    const total = await ArticleModel.count({
      where,
    });
    return COMMON.success(
      res,
      {
        articleList,
        total,
        allPage: Math.ceil(total / pageSize),
      },
      "获取文章列表成功"
    );
  } catch (error) {
    next(error);
  }
};
