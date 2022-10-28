const router = require("express").Router();
const {
  register,
  login,
  logout,
  update,
  info,
  delete: deleteController,
  wxLogin,
} = require("../controller/user-controller");
const {
  isRegister,
  isLogin,
  isUpdate,
  hasUser,
} = require("../validator/UserValidator");
const ip = require("../middleware/ip");

router.post("/register", isRegister, ip, register); // 账号注册
router.post("/login", isLogin, login); // 账号,邮箱登录
router.post("/logout", logout); // 退出登录
router.post("/update", hasUser, isUpdate, update); // 修改个人信息
router.delete("/delete", deleteController); // 账号注销
router.post("/info", info); // 获取用户信息
router.post("/wlogin", wxLogin); // 微信登录

module.exports = router;
