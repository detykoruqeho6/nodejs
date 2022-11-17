const UserModel = require("../model/User");
const {
  randomString,
  encryptPassword,
  verifyPassword,
  generateToken,
  getOpenId,
} = require("../common");

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
    const user = await UserModel.findOne({
      where: {
        account,
      },
    });

    if (!user) {
      return COMMON.error(res, null, "账号不存在");
    }
    
    const verify = verifyPassword(password, user.salt, user.password);
    if (!verify) {
      return COMMON.error(res, null, "密码错误");
    }


    const token = generateToken(user.id);
    return COMMON.success(res, { token }, "登录成功");

  } catch (error) {
    next(error);
  }
};


exports.Register = async (req, res, next) => {
  try {
    const { account, password, nickname } = req.body;
    if (!account || !password) {
      return COMMON.error(res, null, "账号或密码不能为空");
    }
    const user = await UserModel.findOne({
      where: {
        account,
      },
    });

    if (user) {
      return COMMON.error(res, null, "账号已存在");
    }

    const salt = randomString(6);
    const encrypt = encryptPassword(password, salt);
    const newUser = await UserModel.create({
      account,
      password: encrypt,
      salt,
      nickname,
    });

    const token = generateToken(newUser.id);
    return COMMON.success(res, { token }, "注册成功");
  } catch (error) {
    next(error);
  } 
}
