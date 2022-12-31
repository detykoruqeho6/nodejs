// 角色列表
exports.RoleList = (req, res, next) => {
  try {
    res.send("OK");
  } catch (error) {
    next(error);
  }
};

// 添加角色
exports.CreateRole = (req, res, next) => {};

// 角色编辑
exports.EditorRole = (req, res, next) => {};

// 角色删除
exports.DeleteRole = (req, res, next) => {};

// 设置(更新)角色路由权限
exports.SetRoleRoute = (req, res, next) => {};

// 获取角色路由权限
exports.GetRoleRoute = (req, res, next) => {};
