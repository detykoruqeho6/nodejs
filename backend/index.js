const router = require("express").Router();

require("./model"); // import model

router.use("/admin", require("./router/user")); // 管理员路由
router.use("/admin/role", require("./router/role")); // 角色路由

module.exports = router;
