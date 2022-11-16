const { Op } = require("sequelize");
const GoodModel = require("../model/Goods"),
  GoodsCategoryModel = require("../model/GoodsCate");
// Get goods list
exports.getGoodsList = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      title = "",
      sort = `[{"field":"price","order":"desc"}]`,
    } = req.query;
    const sqrtArr = JSON.parse(sort);
    const sortMap = {
      price: "price",
      discount: "discount",
      sales: "sales",
      time: "createdAt",
      score: "score",
    };
    // 如果所传的排序字段不在sortMap中，剔除错误的排序字段
    if (sqrtArr.length > 0) {
      sqrtArr.forEach((item) => {
        if (!sortMap[item.prop]) {
          sqrtArr.splice(sqrtArr.indexOf(item), 1);
        }
      });
    }
    const goods = await GoodModel.findAll({
      where: {
        name: {
          [Op.like]: `%${title}%`,
        },
      },
      // 排序可能同时存在多个
      order: sqrtArr.map((item) => [sortMap[item.field], item.order]),
      // order: [[sortMap[sort], sortType]],
      offset: (page - 1) * limit,
      limit: +limit,
      include: [
        {
          model: GoodsCategoryModel,
          as: "cate",
        },
      ],
    });
    const total = await GoodModel.count({
      where: { name: { [Op.like]: `%${title}%` } },
    });
    const allPage = Math.ceil(total / limit);
    const data = {
      goods,
      total,
      allPage,
    };
    if (goods) {
      // return COMMON.success(res, data, "获取商品列表成功");
      // return COMMON.success(res, data, "获取商品列表成功");
      return res.json({
        status: 400,
        data,
        msg: "获取商品列表成功",
      });
    }
    return COMMON.error(res, null, "获取商品列表失败");
  } catch (error) {
    next(error);
  }
};

// Create goods
exports.createGoods = async (req, res, next) => {
  try {
    const {
      name,
      desc,
      content,
      img,
      price,
      discount,
      sales,
      score,
      cate_id = 1,
    } = req.body;
    // 先查询cate_id是否存在
    const cate = await GoodsCategoryModel.findOne({
      where: {
        id: cate_id,
      },
    });
    if (!cate) return COMMON.error(res, null, "分类不存在!");
    const goods = await GoodModel.create({
      name,
      desc,
      content,
      img,
      price,
      discount,
      sales,
      score,
      cate_id,
    });
    if (goods) {
      return COMMON.success(res, goods, "创建商品成功");
    }
    return COMMON.error(res, null, "创建商品失败");
  } catch (error) {
    next(error);
  }
};

// GoodsDetail
exports.GoodsDetail = async (req, res, next) => {
  try {
    const { id } = req.body;
    const goods = await GoodModel.findOne({
      where: { id },
    });
    if (goods) {
      return COMMON.success(res, goods, "获取商品详情成功");
    }
  } catch (error) {
    next(error);
  }
};

// UpdateGoods
exports.UpdateGoods = async (req, res, next) => {
  try {
    const { id, name, cate_id, price, stock, status, desc } = req.body;
    const goods = await GoodModel.update(
      { name, cate_id, price, stock, status, desc },
      { where: { id } }
    );
    if (goods) {
      return COMMON.success(res, goods, "更新商品成功");
    }
  } catch (error) {
    next(error);
  }
};

// DeleteGoods
exports.DeleteGoods = async (req, res, next) => {
  try {
    const { id } = req.body;
    const goods = await GoodModel.destroy({
      where: { id },
    });
    if (goods) {
      return COMMON.success(res, goods, "删除商品成功");
    }
  } catch (error) {
    next(error);
  }
};
