const { Login, Create, GetUserInfo, LogoOut } = require("../controller/User");
const isAuth = require("../middleware/isAuth");
const {
  isLoginValidator,
  isRegisterValidator,
} = require("../validator/userValidator");

const router = require("express").Router();

router.post("/login", isLoginValidator, Login); // 登录
router.post("/get-info", isAuth, GetUserInfo) // 获取用户信息
router.post("/create", isRegisterValidator, Create); // 注册
router.post("/logout", isAuth, LogoOut); // 退出登录

module.exports = router;
