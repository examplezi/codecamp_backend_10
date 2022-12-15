// import { getToday } from "./utils.js";
// yarn init 하고 엔터 몇 번 치면 자동적으로 생성
// import / export 를 사용하기 위한 파일
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkEmail(email) {
  if (email === "" || email.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({
  name,
  email,
  personal,
  prefer,
  pwd,
  phone,
}) {
  const mytemplate = `
          <html>
              <body>
                <div style: "display: flex; flex-direction: column; align-itmes: center;">
                 <div style = "width: 500px;">
                    <div>name : ${name}</div>
                    <div>email : ${email}</div>
                    <div>personal : ${personal}</div> 
                    <div>prefer : ${prefer}</div>
                    <div>pwd : ${pwd}</div>
                    <div>phone : ${phone}</div>
                  </div>  
                </div>
              </body>
          </html>
      `;
  // console.log(mytemplate)
  return mytemplate;
}

export async function sendTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, //앱 2차 비번
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "가입을 축하합니다.",
    html: mytemplate,
  });

  console.log(result);

  // console.log(
  //   myemail + "이메일로 가입환영템플릿 " + mytemplate + "를 전송합니다."
  // );
}
