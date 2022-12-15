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
}
