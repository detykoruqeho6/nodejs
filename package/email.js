// 发送邮件
const nodemailer = require("nodemailer");
const { email } = require("../config");

const transporter = nodemailer.createTransport(email);

/**
 *
 * @param from 发送者
 * @param aliasName 发送者别名
 * @param tos 接收者
 * @param subject 主题
 * @param msg 内容
 */
function sendMail(from = email.auth.user, aliasName, tos, subject, msg) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        //from    : '标题别名 <foobar@latelee.org>',
        from: aliasName + " " + "<" + from + ">",
        //'li@latelee.org, latelee@163.com',//收件人邮箱，多个邮箱地址间用英文逗号隔开
        to: tos,
        subject: subject, //邮件主题
        //text    : msg,
        html: msg,
      },
      function (err, res) {
        if (err) {
          // console.log("error: ", err);
          reject(err);
        }
        // console.log("email send success");
        resolve(res);
      }
    );
  });
}

module.exports = sendMail;
