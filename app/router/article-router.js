const { getArticleList } = require("../controller/article-controller");
const router = require("express").Router();

router.get("/index", getArticleList);

module.exports = router;
