const validator = require("../../package/validator");
const { body, header } = require("express-validator");
const User = require("../model/User");

exports.isLoginValidator = validator([
  body("account")
    .notEmpty()
    .withMessage("账号不能为空")
    .custom(async (value) => {
      if (!value) return;
      const user = await User.findOne({}).where({ account: value });
      if (!user) {
        return Promise.reject("账号不存在");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .custom(async (value, { req }) => {
      if (!value) return;
      const user = await User.findOne({
        where: {
          account: req.body.account,
        },
      });
    }),
]);

exports.isRegisterValidator = validator([]);
