const { Login, Register } = require("../controller/User");
const {
  isLoginValidator,
  isRegisterValidator,
} = require("../validator/userValidator");

const router = require("express").Router();

router.post("/login", isLoginValidator, Login);
router.post("/register", isRegisterValidator, Register);

module.exports = router;
