const UserModel = require("../model/User"),
  UserAccountModel = require("../model/UserAccount");
const {
  randomString,
  encryptPassword,
  verifyPassword,
  generateToken,
  getOpenId,
} = require("../../common");
const { Op } = require("sequelize");
const crypto = require("crypto");
const { isMockWlogin } = require("../../config");

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
    // openid); // 用户唯一标识
    // session_key); // 会话密钥

    // 将用户信息存入数据库
    const userAccount = await UserAccountModel.findOne({
      where: {
        openid,
      },
      attributes: ["id", "is_freeze"],
      include: [
        {
          model: UserModel,
          as: "hasUser",
          attributes: ["id", "account", "email", "phone"],
        },
      ],
    });
    if (!userAccount) {
      // 如果两个表都不存在,则创建
      const user = await UserModel.create({});
      const user_account = await UserAccountModel.create({
        user_id: user.id,
        openid,
        session_key,
        last_ip: req.ip,
        is_mock_user: isMockWlogin ? 0 : null,
      });
      const token = generateToken(user.dataValues);
      if (user_account.dataValues.is_freeze == 1) {
        return COMMON.error(res, [], "账号已封禁");
      }
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
      const userInfo = await UserModel.findOne({
        where: {
          id: req.user_id,
        },
      });
      const token = generateToken(user.dataValues);
      return COMMON.success(res, {
        ...userInfo,
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
  try {
    const id = req.user_id;
    const { phone, password } = req.body;
    let salt = null,
      cypPassword = null;
    if (phone) {
      salt = randomString(6);
      cypPassword = encryptPassword(password ? password : phone, salt);
    }

    const user = await UserModel.update(
      {
        account: phone || null,
        password: cypPassword ? cypPassword.password : null,
        salt: cypPassword ? cypPassword.salt : null,
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );
    if (user) {
      return COMMON.success(res, [], "个人信息修改成功");
    }
  } catch (error) {
    return COMMON.error(res, null, error.message);
  }
};
// 账号注销
exports.delete = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserModel.destroy({
      where: {
        id,
      },
    });
    if (user) {
      return COMMON.success(res, [], "账号注销成功");
    }
  } catch (error) {
    return COMMON.error(res, null, error.message);
  }
};
// 获取用户信息
exports.info = async (req, res) => {
  try {
    const id = req.user_id;
    if (!id) return COMMON.error(res, null, "参数错误");
    const user = await UserModel.findOne({
      where: { id },
      attributes: [
        // "id",
        "account",
        "email",
        "phone",
        "avatar",
        "nickname",
        "introduction",
        "gender",
      ],
      include: [
        {
          model: UserAccountModel,
          as: "hasAccount",
          attributes: ["is_freeze"],
        },
      ],
    });
    if (user) {
      return COMMON.success(res, user, "获取用户信息成功");
    }
    return COMMON.error(res, null, "获取用户信息失败,用户不存在");
  } catch (error) {
    return COMMON.error(res, null, error.message);
  }
};

// 获取微信运动数据
exports.getWeRunData = async (req, res, next) => {
  try {
    const { encryptedData, iv, code } = req.body;
    const { openid, session_key } = await getOpenId(code);
    // 解密微信运动步数
    const result = decryptData(encryptedData, iv, session_key);
    // 获取今天的步数
    const stepInfoList = result.stepInfoList;
    const todayStep = stepInfoList[stepInfoList.length - 1];
    return COMMON.success(res, todayStep, "获取微信运动数据成功");

    function decryptData(encry, iva, seskey) {
      try {
        // base64 decode
        const sessionKey = Buffer.from(seskey, "base64");
        const encryData = Buffer.from(encry, "base64");
        const iv = Buffer.from(iva, "base64");
        let decoded = "";
        // 解密
        const decipher = crypto.createDecipheriv("aes-128-cbc", sessionKey, iv);
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true);
        decoded += decipher.update(encryData, "binary", "utf8");
        decoded += decipher.final("utf8");
        return JSON.parse(decoded);
      } catch (err) {
        console.log(err);
        throw new Error("Illegal Buffer");
      }
    }
  } catch (error) {
    return COMMON.error(res, null, error.message);
  }
};
