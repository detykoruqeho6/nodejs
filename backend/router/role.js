const {
  RoleList,
  CreateRole,
  EditorRole,
  DeleteRole,
  SetRoleRoute,
  GetRoleRoute,
} = require("../controller/Role");

const router = require("express").Router();

router.post("/list", RoleList);
router.post("/create", CreateRole);
router.post("/editor", EditorRole);
router.post("/delete", DeleteRole);
router.post("/setRoleRouter", SetRoleRoute);
router.post("/getRoleRouter", GetRoleRoute);

module.exports = router;
