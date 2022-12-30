const { Login, Create } = require("../controller/User");
const {
  isLoginValidator,
  isRegisterValidator,
} = require("../validator/userValidator");

const router = require("express").Router();

router.post("/login", isLoginValidator, Login);
router.post("/create", isRegisterValidator, Create);

module.exports = router;
