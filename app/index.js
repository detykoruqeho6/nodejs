const router = require("express").Router();

require("./model");

// 设置服务根目录
router.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.render("index", { title: "Express" });
});

router.use("/user", require("./router/user-router"));
router.use("/captcha", require("./router/captch-router"));
router.use("/source", require("./router/source-router"));
router.use("/article", require("./router/article-router"));
router.use("/goods", require("./router/goods-router"));
router.use("/test", require("./router/test"));

module.exports = router;
