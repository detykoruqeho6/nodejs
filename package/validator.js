const { commandOptions } = require("@redis/client/dist/lib/command-options");
const { validationResult } = require("express-validator");
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    // 只获取第一个错误,只拿第一个错误的信息
    const firstError = extractedErrors[0];
    const firstErrorKey = Object.keys(firstError)[0];
    return COMMON.error(res, [], firstError[firstErrorKey]);
  };
};
module.exports = validate;
