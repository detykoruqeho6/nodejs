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

exports.hasUser = validator([
  body("id").notEmpty().withMessage("id不能为空"),
  body("id").custom(async (value) => {
    if (!value) return;
    const user = await UserModel.findOne({
      where: {
        id: value,
      },
    });
    if (!user) {
      return Promise.reject("用户不存在");
    }
  }),
]);
// 修改个人信息参数验证
exports.isUpdate = validator([
  body("nickname")
    .notEmpty()
    .withMessage("昵称不能为空")
    .isLength({ min: 2, max: 20 })
    .withMessage("昵称长度为2-20位"),
  body("email")
    .if((val) => val)
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    // 如果传入的邮箱和数据库中的邮箱一致，就不验证
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (user.email === value) return;
      const email = await UserModel.findOne({
        where: {
          email: value,
        },
      });
      if (email) {
        return Promise.reject("邮箱已被他人使用咯~");
      }
    }),

  body("phone")
    //  如果传入了手机号，才验证手机号
    .if((value) => value)
    .isMobilePhone("zh-CN")
    .withMessage("手机号格式不正确")
    // 如果传入的手机号和数据库中的手机号一致，就不验证
    .custom(async (value, { req }) => {
      const user = await UserModel.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (user.phone === value) return;
      const phone = await UserModel.findOne({
        where: {
          phone: value,
        },
      });
      if (phone) {
        return Promise.reject("手机号已被他人使用咯~");
      }
    }),
  body("password")
    .if((value) => value)
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
  body("introduction")
    .if((value) => value)
    .isLength({ min: 2, max: 100 })
    .withMessage("个人简介长度为2-100位"),
  body("gender")
    .if((value) => value)
    .isIn(["男", "女", "保密"])
    .withMessage("性别只能为男、女、保密"),
  body("avatar")
    .if((value) => value)
    .notEmpty()
    .withMessage("头像不能为空"),
]);
