const { randomNumber } = require("../common");
const sendMail = require("../../package/email");
const router = require("express").Router();
const emailConfig = require("../../config").email;
const client = require("../../package/redis");

router.get("/email", async (req, res) => {
  const { email } = req.query;
  const captcha = randomNumber(6);

  const content = `
<div>
    <h1>欢迎注册  欸嘿网 </h1>
    <div>打死都不要告诉别人你的验证码哦!</div>
    <p>你的验证码是: ${captcha}</p>
</div> 

`;
  if (await client.get(email)) {
    return COMMON.error(res, null, "验证码已发送!请勿重复发送!");
  } else {
    await client.SET(email, captcha, { EX: 360 });

    const result = await sendMail(
      emailConfig.auth.user,
      "FuFu👻",
      email,
      "这是你的验证码哦~",
      content
    );
    if (result) {
      return COMMON.success(res, [], "发送成功");
    } else {
      return COMMON.error(res, [], "发送失败");
    }
  }
});
module.exports = router;
