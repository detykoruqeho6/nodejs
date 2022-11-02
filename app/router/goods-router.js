const router = require("express").Router();
const IsAuth = require("../middleware/CheckLogin");
const {
  getGoodsList,
  createGoods,
  GoodsDetail,
  UpdateGoods,
  DeleteGoods,
} = require("../controller/goods-controller");

router.get("/index", IsAuth,getGoodsList);
router.post("/create", IsAuth, createGoods);
router.post("/detail", IsAuth, GoodsDetail);
router.post("/update", IsAuth, UpdateGoods);
router.post("/delete", IsAuth, DeleteGoods);

module.exports = router;
