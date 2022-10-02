const router = require("express").Router();
const UserRouter = require("../model/User");
const {
  register,
  login,
  logout,
  update,
  info,
  delete: deleteController,
} = require("../controller/user-controller");

router.post("/register", register); //
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", update);
router.delete("/delete", deleteController);
router.get("/info", info);

module.exports = router;
