const validator = require("../../package/validator");
const { body } = require("express-validator");

// 创建文章验证
exports.CreateArticleVali = validator([
  body("title")
    .notEmpty()
    .withMessage("标题不能为空")
    .if(body("title").exists())
    .isLength({ min: 1, max: 50 })
    .withMessage("标题长度为1-50位"),
  body("content")
    .notEmpty()
    .withMessage("内容不能为空")
    .if(body("content").exists())
    .isLength({ min: 1, max: 1500 })
    .withMessage("内容长度为1-1500位"),
  body("tag")
    .if(body("tag").exists())
    .notEmpty()
    .withMessage("标签不能为空")
    .if(body("content").exists())
    .isLength({ min: 1, max: 50 })
    .withMessage("标签长度为1-50位"),
  body("cover")
    .notEmpty()
    .withMessage("封面不能为空")
    .if(body("cover").exists())
    .isLength({ min: 1, max: 100 })
    .withMessage("封面长度为1-100位"),
  body("cate_id")
    .notEmpty()
    .withMessage("分类不能为空")
    .if(body("cate_id").exists()),
  body("author")
    .if(body("author").exists())
    .notEmpty()
    .withMessage("作者不能为空")
    .isLength({ min: 1, max: 20 })
    .withMessage("作者长度为1-20位"),
]);

// 更新文章验证,与创建文章验证一致
exports.UpdateArticleVali = validator([
  // 文章id,非空,整型,长度10
  body("id").notEmpty().withMessage("文章id不能为空"),
  // 继承创建文章验证,
  // ...exports.CreateArticleVali,
]);
