// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const myphone =
    document.getElementById("PhoneNumber01").value +
    document.getElementById("PhoneNumber02").value +
    document.getElementById("PhoneNumber03").value;

  console.log("나의 핸드폰번호: ", myphone);
  // 2. 해당 휴대폰 번호로 인증번호 api 요청하기
  await axios.post("http://localhost:3000/tokens/phone", {
    myphone,
  });
  console.log("인증 번호 전송");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  await axios.post("http://localhost:3000/users", {
    name: document.getElementById("SignupName").value,
    resisteredNum: document.getElementById("SignupPersonal").value,
    phoneDigits:
      document.getElementById("PhoneNumber01").value +
      document.getElementById("PhoneNumber02").value +
      document.getElementById("PhoneNumber03").value,
    faveWeb: document.getElementById("SignupPrefer").value,
    password: document.getElementById("SignupPwd").value,
    myemail: document.getElementById("SignupEmail").value,
  });

  console.log("회원 가입 이메일 전송");
};
