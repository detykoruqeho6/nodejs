const IsAuth = require("../middleware/CheckLogin");
const {
  getArticleList,
  createArticle,
} = require("../controller/article-controller");
const { CreateArticleVali } = require("../validator/ArticleValidator");
const router = require("express").Router();

router.get("/index", getArticleList);
router.post("/create", IsAuth, CreateArticleVali, createArticle);

module.exports = router;
