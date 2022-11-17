const validator = require("../../package/validator");
const { body, header } = require("express-validator");
const User = require("../model/User");

exports.isLoginValidator = validator([
  body("account")
    .notEmpty()
    .withMessage("请输入账号")
    .custom(async (value) => {
      if (!value) return;
      const user = await User.findOne({
        where: { account: value },
      });
      if (!user) {
        return Promise.reject("该登录账号不存在");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("账号密码不能为空")
    .custom(async (value, { req }) => {
      if (!value) return;
      const user = await User.findOne({
        where: {
          account: req.body.account,
        },
      });
    }),
]);

exports.isRegisterValidator = validator([
  body("account")
    .notEmpty()
    .withMessage("请输入账号")
    .custom(async (value) => {
      if (!value) return;
      const user = await User.findOne({
        where: { account: value },
      });
      if (user) {
        return Promise.reject("该账号已被注册");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 6 })
    .withMessage("密码长度不能小于6位")
    .custom(async (value, { req }) => {
      if (!value) return;
      if (value !== req.body.repassword) {
        return Promise.reject("两次输入的密码不一致");
      }
    }),
]);
