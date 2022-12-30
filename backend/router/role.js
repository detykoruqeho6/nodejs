const { RoleList } = require("../controller/Role");

const router = require("express").Router();

router.post("/list", RoleList);

module.exports = router;
