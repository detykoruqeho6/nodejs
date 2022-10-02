const validator = require("../../package/validator");
const { body, header } = require("express-validator");
const { response } = require("express");
const SySqlConnect = require("../../package/db");
const UserModel = require("../model/User");

// 注册参数验证
exports.isRegister = validator([
  body("account")
    .notEmpty()
    .withMessage("账号不能为空")
    .custom(async (value) => {
      if (!value) return;
      const user = await UserModel.findOne({
        where: {
          account: value,
        },
      });
      if (user) {
        return Promise.reject("账号已存在");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 6, max: 16 })
    .withMessage("密码长度为6-16位")
    .custom(async (value) => {
      if (!value) return;
      // 密码强度验证 可以包含数字、字母、特殊字符，至少包含两种
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!reg.test(value)) {
        return Promise.reject("密码强度不够");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .custom(async (value) => {
      if (!value) return;
      const user = await UserModel.findOne({
        where: {
          email: value,
        },
      });
      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),

  body("phone")
    .notEmpty()
    .withMessage("手机号不能为空")
    .isMobilePhone("zh-CN")
    .withMessage("手机号格式不正确")
    .custom(async (value) => {
      if (!value) return;
      const user = await UserModel.findOne({
        where: {
          phone: value,
        },
      });
      if (user) {
        return Promise.reject("手机号已存在");
      }
    }),

  body("nickname")
    .notEmpty()
    .withMessage("昵称不能为空")
    .isLength({ min: 2, max: 20 })
    .withMessage("昵称长度为2-20位"),
]);
// 登录参数验证
exports.isLogin = validator([
  body("account").notEmpty().withMessage("账号不能为空"),
  body("password").notEmpty().withMessage("密码不能为空"),
]);
