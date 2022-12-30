exports.RoleList = (req, res, next) => {
  try {
    res.send("OK");
  } catch (error) {
    next(error);
  }
};

exports.CreateRole;
