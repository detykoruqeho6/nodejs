const UserModel = require("../model/User"),
  UserAccountModel = require("../model/UserAccount");
const {
  randomString,
  encryptPassword,
  verifyPassword,
  generateToken,
  getOpenId,
} = require("../common");
const { Op } = require("sequelize");

// 注册
exports.register = async (req, res) => {
  try {
    const { account, password, email, phone } = req.body;
    const salt = randomString(6);
    const passwordCyp = encryptPassword(password, salt);
    await UserModel.create({
      account,
      password: passwordCyp.password,
      email,
      phone,
      salt: passwordCyp.salt,
    }).then((user) => {
      user.dataValues["user_id"] = user.dataValues.id;
      user.dataValues["last_ip"] = req.ip;
      user.dataValues["last_system"] = req.headers["user-agent"];
      UserAccountModel.create(user.dataValues);

      const result = user;
      delete result["dataValues"].password;
      delete result["dataValues"].salt;
      delete result["dataValues"].id;

      return COMMON.success(res, result["dataValues"]);
    });
  } catch (error) {
    return COMMON.error(res, [], error.message);
  }
};
// 账号/邮箱登录
exports.login = async (req, res) => {
  const { account, password } = req.body;
  // 寻找账号是传入的,或者邮箱是传入的
  // 判断传入账号是否是邮箱
  const isEmail = account.indexOf("@") > -1;
  const where = isEmail ? { email: account } : { account };
  const user = await UserModel.findOne({
    where,
    attributes: ["id", "password", "salt"],
    // 关联账号表
    include: [
      {
        model: UserAccountModel,
        as: "hasAccount",
        attributes: ["id", "is_freeze"],
      },
    ],
  });
  console.log(user["dataValues"]["hasAccount"]["dataValues"]);
  // 验证密码
  if (user) {
    const result = verifyPassword(password, user.salt, user.password);
    if (result) {
      const token = generateToken(user["dataValues"]);

      const result = user;
      const isFreeze =
        result["dataValues"]["hasAccount"]["dataValues"]["is_freeze"];
      console.log(isFreeze);
      if (isFreeze == 1) {
        return COMMON.error(res, [], "账号已封禁");
      }
      delete result["dataValues"].password;
      delete result["dataValues"].salt;
      delete result["dataValues"].id;
      return COMMON.success(res, {
        ...result["dataValues"],
        token,
      });
    }
    return COMMON.error(res, "密码错误");
  } else {
    return COMMON.error(res, "该账号还未注册哦~");
  }
};
// 微信登录
exports.wxLogin = async (req, res) => {
  try {
    const { code, encryptedData, iv } = req.body;
    const { openid, session_key } = await getOpenId(code);
    console.log(openid); // 用户唯一标识
    console.log(session_key); // 会话密钥

    // 将用户信息存入数据库
    const user = await UserAccountModel.findOne({
      where: {
        openid,
      },
      attributes: ["id", "is_freeze"],
      include: [
        {
          model: UserModel,
          as: "belongsToUser",
        },
      ],
    });
    if (!user) {
      // 如果两个表都不存在,则创建
      const user = await UserModel.create({});
      const user_account = await UserAccountModel.create({
        user_id: user.id,
        openid,
        session_key,
        last_ip: req.ip,
      });
      const token = generateToken(user.dataValues);
      return COMMON.success(res, {
        ...user.dataValues,
        token,
      });
    } else {
      // 如果存在,则更新session_key
      await UserAccountModel.update(
        {
          session_key,
        },
        {
          where: {
            openid,
          },
        }
      );
      const token = generateToken(user.dataValues);
      return COMMON.success(res, {
        ...user.dataValues,
        token,
      });
    }
  } catch (err) {
    console.log(err);
    return COMMON.serverError(res, [], err.message);
  }
};

// 退出登录
exports.logout = async (req, res) => {
  COMMON.success(res, "退出成功");
};
// 修改个人信息
exports.update = async (req, res) => {
  COMMON.success(res, "更新成功");
};
// 账号注销
exports.delete = async (req, res) => {
  COMMON.success(res, "注销成功");
};
// 获取用户信息
exports.info = async (req, res) => {
  COMMON.success(res, "获取成功");
};
