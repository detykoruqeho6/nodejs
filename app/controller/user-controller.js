const UserModel = require("../model/User"),
  UserAccountModel = require("../model/UserAccount");
const {
  randomString,
  encryptPassword,
  verifyPassword,
  generateToken,
} = require("../common");
const { Op } = require("sequelize");

exports.register = async (req, res) => {
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
    UserAccountModel.create({
      user_id: user.id,
      balance: 0,
      last_ip: req.ip,
      last_login_time: new Date(),
      last_system: req.headers["user-agent"],
    });
    const result = user;
    delete result["dataValues"].password;
    delete result["dataValues"].salt;
    delete result["dataValues"].id;
    return COMMON.success(res, result["dataValues"]);
  });
};
exports.login = async (req, res) => {
  const { account, password } = req.body;
  // 寻找账号是传入的,或者邮箱是传入的
  // 判断传入账号是否是邮箱
  const isEmail = account.indexOf("@") > -1;
  const where = isEmail
    ? {
        email: account,
      }
    : {
        account,
      };
  const user = await UserModel.findOne({
    where,
    attributes: [
      "id",
      "account",
      "email",
      "phone",
      "password",
      "salt",
      "createdAt",
    ],
    include: ["UserAccount"],
  });
  // 验证密码
  if (user) {
    const result = verifyPassword(password, user.salt, user.password);
    console.log(user);
    if (result) {
      const token = generateToken(user.dataValues);

      const result = user;
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
    return COMMON.error(res, "账号不存在");
  }
};
exports.logout = async (req, res) => {
  COMMON.success(res, "退出成功");
};
exports.update = async (req, res) => {
  COMMON.success(res, "更新成功");
};
exports.delete = async (req, res) => {
  COMMON.success(res, "注销成功");
};
exports.info = async (req, res) => {
  COMMON.success(res, "获取成功");
};
