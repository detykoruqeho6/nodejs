const IsAuth = require("../middleware/CheckLogin");
const {
  getArticleList,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/article-controller");
const {
  CreateArticleVali,
  UpdateArticleVali,
} = require("../validator/ArticleValidator");
const router = require("express").Router();

router.get("/index", getArticleList);
router.post("/create", IsAuth, CreateArticleVali, createArticle);
router.post("/update", IsAuth, UpdateArticleVali, updateArticle);
router.post("/delete", IsAuth, deleteArticle);

module.exports = router;
