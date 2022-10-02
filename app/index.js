const router = require("express").Router();

// 设置服务根目录
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.use("/user", require("./router/user-router"));

module.exports = router;
