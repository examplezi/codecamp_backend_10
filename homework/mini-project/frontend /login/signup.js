// 휴대폰 인증 토큰 전송API를 요청해주세요.
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  await axios.post("http://localhost:4000/tokens/phone", {
    phone:
      document.getElementById("PhoneNumber01").value +
      document.getElementById("PhoneNumber02").value +
      document.getElementById("PhoneNumber03").value,
  });
};

// 핸드폰 인증 완료 API를 요청해주세요.
const submitToken = async () => {
  await axios.patch("http://localhost:4000/tokens/phone", {
    phone:
      document.getElementById("PhoneNumber01").value +
      document.getElementById("PhoneNumber02").value +
      document.getElementById("PhoneNumber03").value,
    token: document.getElementById("TokenInput").value,
  });
};

// 회원 가입 API를 요청해주세요.
const submitSignup = async () => {
  await axios.post("http://localhost:4000/users", {
    name: document.getElementById("SignupName").value,
    email: document.getElementById("SignupEmail").value,
    personal:
      document.getElementById("SignupPersonal1").value +
      "-" +
      document.getElementById("SignupPersonal2").value,
    prefer: document.getElementById("SignupPrefer").value,
    pwd: document.getElementById("SignupPwd").value,
    phone:
      document.getElementById("PhoneNumber01").value +
      document.getElementById("PhoneNumber02").value +
      document.getElementById("PhoneNumber03").value,
  });
};
