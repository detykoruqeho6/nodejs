const router = require("express").Router();
const {
  register,
  login,
  logout,
  update,
  info,
  delete: deleteController,
} = require("../controller/user-controller");
const { isRegister, isLogin } = require("../validator/UserValidator");
const ip = require("../middleware/ip");

router.post("/register", isRegister, ip, register); //
router.post("/login", isLogin, login);
router.post("/logout", logout);
router.put("/update", update);
router.delete("/delete", deleteController);
router.get("/info", info);

module.exports = router;
