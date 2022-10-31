const GoodModel = require("../model/Goods"),
  GoodsCategoryModel = require("../model/GoodsCate");
const { Op } = require("sequelize");

// Get goods list
exports.getGoodsList = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      title = "",
      sort = [
        {
          field: "score",
          order: "asc",
        },
      ],
    } = req.query;
    // 排序价格从高到底,折扣从高到底,销量从高到底,上架时间从新到旧,综合评分从高到底
    const sortMap = {
      price: "price",
      discount: "discount",
      sales: "sales",
      time: "createdAt",
      score: "score",
    };
    const goods = await GoodModel.findAll({
      where: {
        name: {
          [Op.like]: `%${title}%`,
        },
      },
      // 排序可能同时存在多个
      order: sort.map((item) => [sortMap[item.field], item.order]),
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
    if (goods) {
      return COMMON.success(res, goods, "获取商品列表成功");
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
      where: {
        id,
      },
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
      {
        name,
        cate_id,
        price,
        stock,
        status,
        desc,
      },
      {
        where: {
          id,
        },
      }
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
      where: {
        id,
      },
    });
    if (goods) {
      return COMMON.success(res, goods, "删除商品成功");
    }
  } catch (error) {
    next(error);
  }
};
