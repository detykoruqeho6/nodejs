const UserModel = require("../model/User");
const {
  randomString,
  encryptPassword,
  verifyPassword,
  generateToken,
  getOpenId,
} = require("../../common");

/**
 * 登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.Login = async (req, res, next) => {
  try {
    const { account, password, as_code } = req.body;
    if (!account || !password) {
      return COMMON.error(res, null, "账号或密码不能为空");
    }
    const newUser = await UserModel.findOne({
      where: { account },
    });
    if (!newUser) {
      return COMMON.error(res, null, "账号不存在");
    }
    const verify = verifyPassword(
      password,
      newUser.dataValues.salt,
      newUser.dataValues.password
    );
    if (!verify) {
      return COMMON.error(res, null, "密码错误");
    }

    const genTokenData = {
      id: newUser.dataValues.id,
      account: newUser.dataValues.account,
      status: newUser.dataValues.status,
      type: "BACKEND",
    };
    const token = generateToken(genTokenData);

    return COMMON.success(res, { token }, "登录成功");
  } catch (error) {
    next(error);
  }
};
/**
 * 后台账号添加
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.Create = async (req, res, next) => {
  try {
    const {
      account, // 账号
      password, // 密码
      sort, // 账号排序
      status, // 账号状态
      role, // 账号角色
      isRoute, // 是否单独设置账号权限
      email, // 账号联系邮箱
      introduction, // 账号简介
    } = req.body;

    const user = await UserModel.findOne({
      where: { account },
    });

    if (user) return COMMON.error(res, null, "账号已存在🙂");

    const salt = randomString(20);
    const encrypt = encryptPassword(password, salt);
    const newUser = await UserModel.create({
      account,
      password: encrypt.password,
      salt: encrypt.salt,
      sort,
      status,
      role,
      email,
      introduction,
    });

    return COMMON.success(res, null, "注册成功");
  } catch (error) {
    next(error);
  }
};
/**
 * 获取用户信息
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.GetUserInfo = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await UserModel.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "salt", "createdAt", "updatedAt", "id", "sort"],
      }
    });
    return COMMON.success(res, user, "获取成功");
  } catch (error) {
    next(error);
  }
}

/**
 * 获取当前账号路由权限
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.GetUserPermissionRouter = async (req, res, next) => { }
