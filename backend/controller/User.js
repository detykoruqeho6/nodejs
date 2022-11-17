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
    const { account, password } = req.body;
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
 * 账号注册
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.Register = async (req, res, next) => {
  try {
    const { account, password } = req.body;

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
    });
    const genTokenData = {
      id: newUser.dataValues.id,
      account: newUser.dataValues.account,
      status: newUser.dataValues.status,
      type: "BACKEND",
    };
    const token = generateToken(genTokenData);
    return COMMON.success(res, { token }, "注册成功");
  } catch (error) {
    next(error);
  }
};
